/**
 * Xeoo Icon Theme - Build Pipeline
 * 
 * Compiles modular icon definitions into the official VS Code icon-theme JSON specification.
 * Output is written to: themes/xeoo-icon-theme.json
 * 
 * Zero external dependencies. Uses native Node.js APIs.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const THEMES_DIR = path.join(ROOT_DIR, 'themes');
const OUTPUT_FILE = path.join(THEMES_DIR, 'xeoo-icon-theme.json');

// Import modular definitions
const foldersDef = require('./definitions/folders');
const extensionsDef = require('./definitions/extensions');
const filenamesDef = require('./definitions/filenames');
const languagesDef = require('./definitions/languages');

function sortObjectKeys(obj) {
  const sorted = {};
  Object.keys(obj).sort().forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

function buildTheme() {
  console.log('⚡ [Xeoo Build] Compiling Xeoo Icon Theme manifest...');

  const errors = [];
  const warnings = [];

  // Intermediate registry
  const iconDefinitions = {};
  const registeredIcons = new Map(); // id -> { path, absPath, source }

  function registerIcon(id, relPathFromRoot, sourceModule) {
    if (!id || typeof id !== 'string') {
      errors.push(`[${sourceModule}] Invalid icon ID: "${id}"`);
      return;
    }
    if (!relPathFromRoot || typeof relPathFromRoot !== 'string') {
      errors.push(`[${sourceModule}] Invalid path for icon "${id}": "${relPathFromRoot}"`);
      return;
    }

    const absPath = path.resolve(ROOT_DIR, relPathFromRoot);

    // Prevent path traversal outside project root
    if (!absPath.startsWith(ROOT_DIR)) {
      errors.push(`[${sourceModule}] Path traversal detected for icon "${id}": "${relPathFromRoot}"`);
      return;
    }

    // Verify SVG file existence
    if (!fs.existsSync(absPath)) {
      errors.push(`[${sourceModule}] Icon file missing for ID "${id}": "${relPathFromRoot}" (expected at ${absPath})`);
      return;
    }

    if (registeredIcons.has(id)) {
      const existing = registeredIcons.get(id);
      if (existing.absPath !== absPath) {
        errors.push(`[Conflict] Duplicate icon ID "${id}" declared with conflicting paths: "${existing.path}" (${existing.source}) vs "${relPathFromRoot}" (${sourceModule})`);
        return;
      }
    } else {
      registeredIcons.set(id, { path: relPathFromRoot, absPath, source: sourceModule });
    }

    // Path inside themes/xeoo-icon-theme.json must be relative to themes/ directory
    let relToTheme = path.relative(THEMES_DIR, absPath).replace(/\\/g, '/');
    if (!relToTheme.startsWith('.')) {
      relToTheme = './' + relToTheme;
    }

    iconDefinitions[id] = {
      iconPath: relToTheme
    };
  }

  // 1. Register defaults
  if (foldersDef.defaults?.folder) {
    registerIcon(foldersDef.defaults.folder.id, foldersDef.defaults.folder.path, 'definitions/folders.js (defaults.folder)');
  }
  if (foldersDef.defaults?.folderExpanded) {
    registerIcon(foldersDef.defaults.folderExpanded.id, foldersDef.defaults.folderExpanded.path, 'definitions/folders.js (defaults.folderExpanded)');
  }
  if (extensionsDef.defaults?.file) {
    registerIcon(extensionsDef.defaults.file.id, extensionsDef.defaults.file.path, 'definitions/extensions.js (defaults.file)');
  }

  // 2. Register module-declared icons
  const moduleList = [
    { name: 'definitions/folders.js', def: foldersDef },
    { name: 'definitions/extensions.js', def: extensionsDef },
    { name: 'definitions/filenames.js', def: filenamesDef },
    { name: 'definitions/languages.js', def: languagesDef }
  ];

  moduleList.forEach(({ name, def }) => {
    if (def.icons && typeof def.icons === 'object') {
      Object.entries(def.icons).forEach(([id, meta]) => {
        const iconPath = typeof meta === 'string' ? meta : meta.path;
        registerIcon(id, iconPath, name);
      });
    }
  });

  // 3. Assemble mappings and verify referenced IDs exist
  const folderNames = {};
  const folderNamesExpanded = {};
  const fileExtensions = {};
  const fileNames = {};
  const languageIds = {};

  function assignMapping(targetMap, sourceMap, mapName) {
    if (!sourceMap || typeof sourceMap !== 'object') return;
    Object.entries(sourceMap).forEach(([key, iconId]) => {
      if (!registeredIcons.has(iconId)) {
        errors.push(`[Mapping Error in ${mapName}] Key "${key}" maps to unknown or missing icon ID "${iconId}"`);
      } else {
        targetMap[key] = iconId;
      }
    });
  }

  assignMapping(folderNames, foldersDef.folderNames, 'folderNames');
  assignMapping(folderNamesExpanded, foldersDef.folderNamesExpanded, 'folderNamesExpanded');
  assignMapping(fileExtensions, extensionsDef.fileExtensions, 'fileExtensions');
  assignMapping(fileNames, filenamesDef.fileNames, 'fileNames');
  assignMapping(languageIds, languagesDef.languageIds, 'languageIds');

  // Abort if any errors detected
  if (errors.length > 0) {
    console.error(`\n❌ [Xeoo Build Failed] Encountered ${errors.length} error(s):`);
    errors.forEach((err) => console.error(`   • ${err}`));
    process.exit(1);
  }

  // 4. Construct final VS Code Icon Theme manifest
  const themeManifest = {
    $schema: 'vscode://schemas/icon-theme',
    description: 'Xeoo Icon Theme - Automatically generated by src/build.js. Do not edit manually.',
    iconDefinitions: sortObjectKeys(iconDefinitions)
  };

  if (foldersDef.defaults?.folder?.id && registeredIcons.has(foldersDef.defaults.folder.id)) {
    themeManifest.folder = foldersDef.defaults.folder.id;
  }
  if (foldersDef.defaults?.folderExpanded?.id && registeredIcons.has(foldersDef.defaults.folderExpanded.id)) {
    themeManifest.folderExpanded = foldersDef.defaults.folderExpanded.id;
  }
  if (extensionsDef.defaults?.file?.id && registeredIcons.has(extensionsDef.defaults.file.id)) {
    themeManifest.file = extensionsDef.defaults.file.id;
  }

  themeManifest.folderNames = sortObjectKeys(folderNames);
  themeManifest.folderNamesExpanded = sortObjectKeys(folderNamesExpanded);
  themeManifest.fileExtensions = sortObjectKeys(fileExtensions);
  themeManifest.fileNames = sortObjectKeys(fileNames);
  themeManifest.languageIds = sortObjectKeys(languageIds);

  // Ensure output directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  // Write deterministic output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(themeManifest, null, 2) + '\n', 'utf8');

  console.log(`✅ [Xeoo Build] Successfully generated: ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
  console.log(`   • Total icon definitions: ${Object.keys(iconDefinitions).length}`);
  console.log(`   • Folders mapped: ${Object.keys(folderNames).length}`);
  console.log(`   • Extensions mapped: ${Object.keys(fileExtensions).length}`);
  console.log(`   • Filenames mapped: ${Object.keys(fileNames).length}`);
  console.log(`   • Languages mapped: ${Object.keys(languageIds).length}\n`);
}

if (require.main === module) {
  buildTheme();
}

module.exports = { buildTheme };

