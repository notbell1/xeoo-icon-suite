/**
 * Xeoo Icon Theme - Validation Pipeline
 * 
 * Verifies theme JSON integrity, SVG geometry, security restrictions,
 * folder open/closed symmetry, and mapping collision resolution.
 * 
 * Zero external dependencies. Uses native Node.js APIs.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const THEME_FILE = path.join(ROOT_DIR, 'themes', 'xeoo-icon-theme.json');
const ICONS_DIR = path.join(ROOT_DIR, 'icons');

/**
 * Simulates VS Code's official file icon resolution precedence:
 * 1. Exact match in fileNames
 * 2. Multi-part extension match in fileExtensions (e.g. blade.php)
 * 3. Single extension match in fileExtensions (e.g. ts, js)
 * 4. Fallback to default file icon
 */
function simulateVsCodeFileResolution(filename, theme) {
  const lowerName = filename.toLowerCase();

  // 1. Filename check (case-insensitive in VS Code)
  if (theme.fileNames) {
    if (theme.fileNames[filename]) {
      return { iconId: theme.fileNames[filename], matchedBy: 'fileNames' };
    }
    if (theme.fileNames[lowerName]) {
      return { iconId: theme.fileNames[lowerName], matchedBy: 'fileNames' };
    }
    const foundKey = Object.keys(theme.fileNames).find(k => k.toLowerCase() === lowerName);
    if (foundKey) {
      return { iconId: theme.fileNames[foundKey], matchedBy: `fileNames (${foundKey})` };
    }
  }

  // 2. Extension checks (multi-part, then single)
  if (theme.fileExtensions) {
    const parts = lowerName.split('.');
    if (parts.length > 1) {
      // Check multi-part extensions (e.g. 'blade.php')
      for (let i = 1; i < parts.length - 1; i++) {
        const multiExt = parts.slice(i).join('.');
        if (theme.fileExtensions[multiExt]) {
          return { iconId: theme.fileExtensions[multiExt], matchedBy: `fileExtensions (.${multiExt})` };
        }
      }
      // Single extension (e.g. 'ts')
      const singleExt = parts[parts.length - 1];
      if (theme.fileExtensions[singleExt]) {
        return { iconId: theme.fileExtensions[singleExt], matchedBy: `fileExtensions (.${singleExt})` };
      }
    }
  }

  // 3. Fallback
  return { iconId: theme.file, matchedBy: 'fallback (file)' };
}

/**
 * Simulates VS Code's folder icon resolution
 */
function simulateVsCodeFolderResolution(folderName, isExpanded, theme) {
  const lowerName = folderName.toLowerCase();
  const map = isExpanded ? theme.folderNamesExpanded : theme.folderNames;
  const fallback = isExpanded ? theme.folderExpanded : theme.folder;

  if (map && map[lowerName]) {
    return { iconId: map[lowerName], matchedBy: isExpanded ? 'folderNamesExpanded' : 'folderNames' };
  }
  return { iconId: fallback, matchedBy: isExpanded ? 'fallback (folderExpanded)' : 'fallback (folder)' };
}

function validateTheme() {
  console.log('🔍 [Xeoo Validate] Running comprehensive validation suite...\n');

  const errors = [];
  const warnings = [];

  // 1. Verify theme JSON file existence and readability
  if (!fs.existsSync(THEME_FILE)) {
    errors.push(`Theme file missing at: ${path.relative(ROOT_DIR, THEME_FILE)}. Run "npm run build" first.`);
    return reportAndExit(errors, warnings);
  }

  let theme;
  try {
    const raw = fs.readFileSync(THEME_FILE, 'utf8');
    theme = JSON.parse(raw);
  } catch (err) {
    errors.push(`Failed to parse theme JSON: ${err.message}`);
    return reportAndExit(errors, warnings);
  }

  // 2. Structural checks on top-level keys
  if (!theme.iconDefinitions || typeof theme.iconDefinitions !== 'object') {
    errors.push('Theme must contain an "iconDefinitions" object.');
  }

  const iconDefs = theme.iconDefinitions || {};
  const iconDefKeys = new Set(Object.keys(iconDefs));

  // Verify default fallbacks
  if (theme.file && !iconDefKeys.has(theme.file)) {
    errors.push(`Default file icon "${theme.file}" is not defined in iconDefinitions.`);
  }
  if (theme.folder && !iconDefKeys.has(theme.folder)) {
    errors.push(`Default folder icon "${theme.folder}" is not defined in iconDefinitions.`);
  }
  if (theme.folderExpanded && !iconDefKeys.has(theme.folderExpanded)) {
    errors.push(`Default folderExpanded icon "${theme.folderExpanded}" is not defined in iconDefinitions.`);
  }

  // 3. Mapping reference checks
  const mappingGroups = [
    { name: 'folderNames', map: theme.folderNames },
    { name: 'folderNamesExpanded', map: theme.folderNamesExpanded },
    { name: 'fileExtensions', map: theme.fileExtensions },
    { name: 'fileNames', map: theme.fileNames },
    { name: 'languageIds', map: theme.languageIds }
  ];

  mappingGroups.forEach(({ name, map }) => {
    if (map && typeof map === 'object') {
      Object.entries(map).forEach(([key, iconId]) => {
        if (!iconDefKeys.has(iconId)) {
          errors.push(`Mapping in "${name}": key "${key}" references undeclared icon ID "${iconId}".`);
        }
      });
    }
  });

  // 4. Folder open/closed symmetry checks
  const closedFolders = new Set(Object.keys(theme.folderNames || {}));
  const openFolders = new Set(Object.keys(theme.folderNamesExpanded || {}));

  closedFolders.forEach((folder) => {
    if (!openFolders.has(folder)) {
      errors.push(`Folder symmetry violation: "${folder}" is declared in folderNames but missing in folderNamesExpanded.`);
    }
  });

  openFolders.forEach((folder) => {
    if (!closedFolders.has(folder)) {
      errors.push(`Folder symmetry violation: "${folder}" is declared in folderNamesExpanded but missing in folderNames.`);
    }
  });

  // 5. SVG file integrity, security & geometry checks
  const themesDir = path.dirname(THEME_FILE);
  const referencedPaths = new Set();

  Object.entries(iconDefs).forEach(([id, def]) => {
    if (!def.iconPath || typeof def.iconPath !== 'string') {
      errors.push(`Icon definition "${id}" is missing a valid "iconPath".`);
      return;
    }

    const absSvgPath = path.resolve(themesDir, def.iconPath);
    referencedPaths.add(absSvgPath);

    // Path traversal check
    if (!absSvgPath.startsWith(ROOT_DIR)) {
      errors.push(`Security violation: iconPath "${def.iconPath}" for ID "${id}" escapes project boundary.`);
      return;
    }

    // File existence check
    if (!fs.existsSync(absSvgPath)) {
      errors.push(`Icon file missing on disk for ID "${id}": expected at "${path.relative(ROOT_DIR, absSvgPath)}".`);
      return;
    }

    // Read and inspect SVG contents
    try {
      const svgContent = fs.readFileSync(absSvgPath, 'utf8');

      // Check viewBox="0 0 32 32"
      const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
      if (!viewBoxMatch) {
        errors.push(`SVG "${path.relative(ROOT_DIR, absSvgPath)}" is missing a viewBox attribute.`);
      } else if (viewBoxMatch[1].trim() !== '0 0 32 32') {
        errors.push(`SVG "${path.relative(ROOT_DIR, absSvgPath)}" has invalid viewBox "${viewBoxMatch[1]}". Required: "0 0 32 32".`);
      }

      // Prohibited element checks
      if (/<script\b/i.test(svgContent)) {
        errors.push(`Security violation: SVG "${path.relative(ROOT_DIR, absSvgPath)}" contains prohibited <script> tag.`);
      }
      if (/<iframe\b/i.test(svgContent)) {
        errors.push(`Security violation: SVG "${path.relative(ROOT_DIR, absSvgPath)}" contains prohibited <iframe> tag.`);
      }
      if (/https?:\/\//i.test(svgContent)) {
        const cleanContent = svgContent.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '');
        if (/https?:\/\//i.test(cleanContent)) {
          errors.push(`Security violation: SVG "${path.relative(ROOT_DIR, absSvgPath)}" references external network URL.`);
        }
      }
      if (/feGaussianBlur/i.test(svgContent)) {
        errors.push(`Design rule violation: SVG "${path.relative(ROOT_DIR, absSvgPath)}" contains prohibited feGaussianBlur filter.`);
      }
      if (/feDropShadow/i.test(svgContent)) {
        errors.push(`Design rule violation: SVG "${path.relative(ROOT_DIR, absSvgPath)}" contains prohibited feDropShadow filter.`);
      }
    } catch (readErr) {
      errors.push(`Failed to read SVG "${path.relative(ROOT_DIR, absSvgPath)}": ${readErr.message}`);
    }
  });

  // 6. Scan icons directory for unreferenced SVG files
  function scanSvgFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(scanSvgFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        results.push(fullPath);
      }
    });
    return results;
  }

  const allDiskSvgs = scanSvgFiles(ICONS_DIR);
  allDiskSvgs.forEach((svgPath) => {
    if (!referencedPaths.has(svgPath)) {
      warnings.push(`Unreferenced SVG asset found on disk: "${path.relative(ROOT_DIR, svgPath)}"`);
    }
  });

  // 7. Lightweight Mapping Resolution & Precedence Collision Tests
  console.log('🧪 [Resolution Test Suite] Simulating VS Code icon resolution precedence:');
  const collisionTestCases = [
    { input: 'package.json', expectedId: '_file_package_json', reason: 'Exact filename must map to package.json icon, not .json' },
    { input: 'package-lock.json', expectedId: '_file_package_json', reason: 'Lockfile must map to package.json icon' },
    { input: 'tsconfig.json', expectedId: '_file_tsconfig', reason: 'Exact filename must map to tsconfig icon, not .json' },
    { input: 'tsconfig.base.json', expectedId: '_file_tsconfig', reason: 'Patterned tsconfig must map to tsconfig icon' },
    { input: 'vite.config.ts', expectedId: '_file_vite', reason: 'Exact filename must override .ts extension mapping' },
    { input: 'vite.config.js', expectedId: '_file_vite', reason: 'Exact filename must override .js extension mapping' },
    { input: '.env', expectedId: '_file_env', reason: 'Exact .env must map to active env icon' },
    { input: '.env.local', expectedId: '_file_env', reason: '.env.local must map to active env icon' },
    { input: '.env.example', expectedId: '_file_env_example', reason: '.env.example must map to template env-example icon' },
    { input: '.env.sample', expectedId: '_file_env_example', reason: '.env.sample must map to template env-example icon' },
    { input: '.gitignore', expectedId: '_file_gitignore', reason: '.gitignore must map to dedicated git-ignore icon' },
    { input: '.gitattributes', expectedId: '_file_gitattributes', reason: '.gitattributes must map to dedicated git-attributes icon' },
    { input: '.gitmodules', expectedId: '_file_git', reason: '.gitmodules must map to standard git icon' },
    { input: 'Dockerfile', expectedId: '_file_docker', reason: 'Dockerfile must map to docker icon' },
    { input: 'docker-compose.yml', expectedId: '_file_docker', reason: 'docker-compose.yml must map to docker icon' },
    { input: 'README.md', expectedId: '_file_markdown', reason: 'README.md must map to markdown icon' },
    { input: 'guide.md', expectedId: '_file_markdown', reason: '.md extension must resolve to markdown icon' },
    { input: 'main.ts', expectedId: '_lang_typescript', reason: '.ts extension must resolve to typescript icon' },
    { input: 'script.js', expectedId: '_lang_javascript', reason: '.js extension must resolve to javascript icon' },
    { input: 'Component.jsx', expectedId: '_file_react_jsx', reason: '.jsx extension must resolve to react-jsx icon' },
    { input: 'Component.tsx', expectedId: '_file_react_tsx', reason: '.tsx extension must resolve to react-tsx icon' },
    { input: 'index.html', expectedId: '_lang_html', reason: '.html extension must resolve to html icon' },
    { input: 'styles.css', expectedId: '_lang_css', reason: '.css extension must resolve to css icon' },
    { input: 'theme.scss', expectedId: '_lang_scss', reason: '.scss extension must resolve to scss icon' },
    { input: 'style.less', expectedId: '_lang_less', reason: '.less extension must resolve to less icon' },
    { input: 'app.less', expectedId: '_lang_less', reason: '.less extension must resolve to less icon' },
    { input: 'archive.zip', expectedId: '_file_zip', reason: '.zip extension must resolve to zip archive icon' },
    { input: 'animation.gif', expectedId: '_file_gif', reason: '.gif extension must resolve to gif animated image icon' },
    { input: 'image.svg', expectedId: '_file_svg', reason: '.svg extension must resolve to svg vector graphic icon' },
    { input: 'logo.svg', expectedId: '_file_svg', reason: '.svg extension must resolve to svg vector graphic icon' },
    { input: 'LICENSE', expectedId: '_file_license', reason: 'LICENSE must map to license icon' },

    // Phase 05 & 05.1: Backend Languages & Runtimes (Full PHP Suite & Core Backend)
    { input: 'index.php', expectedId: '_lang_php', reason: '.php extension must resolve to php icon' },
    { input: 'app.php', expectedId: '_lang_php', reason: 'app.php must resolve to php icon' },
    { input: 'template.php', expectedId: '_lang_php', reason: 'template.php must resolve to php icon' },
    { input: 'view.phtml', expectedId: '_lang_php', reason: '.phtml extension must resolve to php icon' },
    { input: 'legacy.php3', expectedId: '_lang_php', reason: '.php3 extension must resolve to php icon' },
    { input: 'legacy.php4', expectedId: '_lang_php', reason: '.php4 extension must resolve to php icon' },
    { input: 'legacy.php5', expectedId: '_lang_php', reason: '.php5 extension must resolve to php icon' },
    { input: 'legacy.php7', expectedId: '_lang_php', reason: '.php7 extension must resolve to php icon' },
    { input: 'script.php8', expectedId: '_lang_php', reason: '.php8 extension must resolve to php icon' },
    { input: 'source.phps', expectedId: '_lang_php', reason: '.phps extension must resolve to php icon' },
    { input: 'composer.phar', expectedId: '_lang_php', reason: '.phar extension must resolve to php icon' },
    { input: 'app.py', expectedId: '_lang_python', reason: '.py extension must resolve to python icon' },
    { input: 'Main.java', expectedId: '_lang_java', reason: '.java extension must resolve to java icon' },
    { input: 'Program.cs', expectedId: '_lang_csharp', reason: '.cs extension must resolve to csharp icon' },
    { input: 'main.go', expectedId: '_lang_go', reason: '.go extension must resolve to go icon' },
    { input: 'lib.rs', expectedId: '_lang_rust', reason: '.rs extension must resolve to rust icon' },
    { input: 'app.rb', expectedId: '_lang_ruby', reason: '.rb extension must resolve to ruby icon' },
    { input: 'init.lua', expectedId: '_lang_lua', reason: '.lua extension must resolve to lua icon' },
    { input: 'main.dart', expectedId: '_lang_dart', reason: '.dart extension must resolve to dart icon' },

    // Phase 05: Framework Templates & Configurations
    { input: 'view.blade.php', expectedId: '_file_blade', reason: 'view.blade.php multi-part extension must resolve to blade icon, overriding .php' },
    { input: 'welcome.blade.php', expectedId: '_file_blade', reason: 'welcome.blade.php multi-part extension must resolve to blade icon' },
    { input: 'layout.blade.php', expectedId: '_file_blade', reason: '.blade.php multi-part extension must resolve to blade icon' },
    { input: 'App.vue', expectedId: '_file_vue', reason: '.vue extension must resolve to vue icon' },
    { input: 'Card.svelte', expectedId: '_file_svelte', reason: '.svelte extension must resolve to svelte icon' },
    { input: 'page.astro', expectedId: '_file_astro', reason: '.astro extension must resolve to astro icon' },
    { input: 'tailwind.config.js', expectedId: '_file_tailwind', reason: 'tailwind.config.js must map to tailwind icon' },
    { input: 'tailwind.config.ts', expectedId: '_file_tailwind', reason: 'tailwind.config.ts must map to tailwind icon' },
    { input: 'tailwind.config.cjs', expectedId: '_file_tailwind', reason: 'tailwind.config.cjs must map to tailwind icon' },
    { input: 'tailwind.config.mjs', expectedId: '_file_tailwind', reason: 'tailwind.config.mjs must map to tailwind icon' },
    { input: 'next.config.js', expectedId: '_file_next', reason: 'next.config.js must map to next icon' },
    { input: 'next.config.mjs', expectedId: '_file_next', reason: 'next.config.mjs must map to next icon' },
    { input: 'next.config.ts', expectedId: '_file_next', reason: 'next.config.ts must map to next icon' },
    { input: 'next.config.cjs', expectedId: '_file_next', reason: 'next.config.cjs must map to next icon' },
    { input: 'phpunit.xml', expectedId: '_file_phpunit', reason: 'phpunit.xml must map to phpunit icon' },
    { input: 'phpunit.xml.dist', expectedId: '_file_phpunit', reason: 'phpunit.xml.dist must map to phpunit icon' },
    { input: 'phpunit.dist.xml', expectedId: '_file_phpunit', reason: 'phpunit.dist.xml must map to phpunit icon' },
    { input: 'angular.json', expectedId: '_file_angular', reason: 'angular.json must map to angular icon' },

    // Phase 05: Data Formats & APIs
    { input: 'settings.json', expectedId: '_file_json', reason: 'Standard .json must map to json icon, not package.json' },
    { input: 'settings.yaml', expectedId: '_file_yaml', reason: 'settings.yaml must map to yaml icon' },
    { input: 'settings.yml', expectedId: '_file_yaml', reason: 'settings.yml must map to yaml icon' },
    { input: 'config.yaml', expectedId: '_file_yaml', reason: 'Standard .yaml must map to yaml icon, not docker' },
    { input: 'config.toml', expectedId: '_file_toml', reason: '.toml extension must resolve to toml icon' },
    { input: 'Cargo.lock', expectedId: '_file_toml', reason: 'Cargo.lock must map to toml icon' },
    { input: 'feed.xml', expectedId: '_file_xml', reason: '.xml extension must resolve to xml icon' },
    { input: 'query.sql', expectedId: '_file_sql', reason: '.sql extension must resolve to sql icon' },
    { input: 'schema.graphql', expectedId: '_file_graphql', reason: '.graphql extension must resolve to graphql icon' },
    { input: 'dataset.csv', expectedId: '_file_csv', reason: '.csv extension must resolve to csv icon' },
    { input: 'service.proto', expectedId: '_file_protobuf', reason: '.proto extension must resolve to protobuf icon' },

    // Phase 05: Game Development & Shaders (Unity audit checks)
    { input: 'player.gd', expectedId: '_file_godot', reason: '.gd extension must resolve to godot icon' },
    { input: 'scene.tscn', expectedId: '_file_godot', reason: '.tscn extension must resolve to godot icon' },
    { input: 'lighting.glsl', expectedId: '_file_shader', reason: '.glsl extension must resolve to shader icon' },
    { input: 'postprocess.hlsl', expectedId: '_file_shader', reason: '.hlsl extension must resolve to shader icon' },
    { input: 'module.wasm', expectedId: '_file_wasm', reason: '.wasm extension must resolve to wasm icon' },
    { input: 'level.unity', expectedId: '_file_unity', reason: '.unity extension must resolve to unity icon' },
    { input: 'character.prefab', expectedId: '_file_unity', reason: '.prefab extension must resolve to unity icon' },
    { input: 'custom.asset', expectedId: '_file', reason: 'Generic .asset must safely fall back to base file icon, avoiding false-positive Unity branding' },
    { input: 'package.meta', expectedId: '_file', reason: 'Generic .meta must safely fall back to base file icon, avoiding false-positive Unity branding' },

    // Fallback Verification
    { input: 'unknown.extension', expectedId: '_file', reason: 'unknown.extension must resolve to fallback file' },
    { input: 'unregistered.random', expectedId: '_file', reason: 'Unregistered extension must resolve to fallback file' }
  ];

  let passedTests = 0;
  collisionTestCases.forEach(({ input, expectedId, reason }) => {
    const res = simulateVsCodeFileResolution(input, theme);
    if (res.iconId !== expectedId) {
      errors.push(`Resolution collision failure on "${input}": Expected "${expectedId}" (${reason}), but resolved to "${res.iconId}" via ${res.matchedBy}`);
    } else {
      passedTests++;
    }
  });

  // Test folder resolution
  const folderTestCases = [
    { name: 'src', open: false, expectedId: '_folder_src' },
    { name: 'src', open: true, expectedId: '_folder_src_open' },
    { name: 'components', open: false, expectedId: '_folder_components' },
    { name: 'components', open: true, expectedId: '_folder_components_open' },
    { name: 'unknown_dir', open: false, expectedId: '_folder' },
    { name: 'unknown_dir', open: true, expectedId: '_folder_open' }
  ];

  folderTestCases.forEach(({ name, open, expectedId }) => {
    const res = simulateVsCodeFolderResolution(name, open, theme);
    if (res.iconId !== expectedId) {
      errors.push(`Folder resolution failure on "${name}" (open: ${open}): Expected "${expectedId}", but got "${res.iconId}" via ${res.matchedBy}`);
    } else {
      passedTests++;
    }
  });

  console.log(`   • ${passedTests}/${collisionTestCases.length + folderTestCases.length} mapping resolution & precedence tests passed successfully.\n`);

  return reportAndExit(errors, warnings, {
    totalDefs: Object.keys(iconDefs).length,
    totalDiskSvgs: allDiskSvgs.length,
    totalTests: passedTests
  });
}

function reportAndExit(errors, warnings, stats = {}) {
  if (warnings.length > 0) {
    console.log(`⚠️  [Xeoo Validation Warnings] (${warnings.length} warning(s)):`);
    warnings.forEach((warn) => console.log(`   • ${warn}`));
    console.log('');
  }

  if (errors.length > 0) {
    console.error(`❌ [Xeoo Validation Errors] (${errors.length} build-blocking error(s)):`);
    errors.forEach((err) => console.error(`   • ${err}`));
    console.error('\nValidation FAILED. Please resolve errors before packaging or releasing.\n');
    process.exit(1);
  }

  console.log('✅ [Xeoo Validation Passed]');
  console.log(`   • Verified ${stats.totalDefs || 0} icon definition(s)`);
  console.log(`   • Verified ${stats.totalDiskSvgs || 0} production SVG file(s) for 32x32 geometry and security rules`);
  console.log(`   • All ${stats.totalTests || 0} collision and precedence simulation tests passed`);
  console.log('   • 100% folder/open-folder symmetry verified');
  console.log('   • All icon references resolve to existing assets on disk');
  console.log('   • Zero path traversal or prohibited filters detected\n');
  process.exit(0);
}

if (require.main === module) {
  validateTheme();
}

module.exports = { validateTheme };
