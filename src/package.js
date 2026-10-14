/**
 * Xeoo Icon Theme - Standalone VSIX Packager
 * 
 * Packages the extension into a standards-compliant VS Code .vsix installer
 * using native Node.js and PowerShell/.NET ZipFile APIs with POSIX-standard
 * forward-slash path separators in the archive manifest.
 * 
 * Zero external dependencies.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const { buildTheme } = require('./build');

function safeRmDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  try {
    fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 10, retryDelay: 250 });
  } catch (err) {
    try {
      const escaped = dirPath.replace(/'/g, "''");
      execSync(`powershell -NoProfile -Command "Remove-Item -LiteralPath '${escaped}' -Recurse -Force"`);
    } catch (_) {
      // Ignore if already deleted
    }
  }
}

function packageExtension() {
  console.log('📦 [Xeoo Package] Initiating packaging sequence...\n');

  // 1. Build and validate before packaging
  console.log('--- Step 1: Pre-packaging Build ---');
  buildTheme();

  console.log('--- Step 2: Pre-packaging Validation ---');
  execSync('node src/validate.js', { cwd: ROOT_DIR, stdio: 'inherit' });

  // 2. Read package.json metadata
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found at ${pkgPath}`);
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  // Clean previous .vsix archives in ROOT_DIR
  fs.readdirSync(ROOT_DIR).forEach((file) => {
    if (file.endsWith('.vsix')) {
      fs.unlinkSync(path.join(ROOT_DIR, file));
    }
  });

  const vsixName = `${pkg.name}-${pkg.version}.vsix`;
  const vsixOutput = path.join(ROOT_DIR, vsixName);

  console.log(`\n--- Step 3: Assembling VSIX Bundle: ${vsixName} ---`);

  // Staging directory strictly inside ROOT_DIR
  const stageDir = path.join(ROOT_DIR, '.vsix_stage');
  safeRmDir(stageDir);
  fs.mkdirSync(stageDir, { recursive: true });

  // 3. Generate [Content_Types].xml
  const contentTypesXml = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".js" ContentType="application/javascript"/>
  <Default Extension=".md" ContentType="text/markdown"/>
  <Default Extension=".txt" ContentType="text/plain"/>
  <Default Extension=".svg" ContentType="image/svg+xml"/>
  <Default Extension=".png" ContentType="image/png"/>
  <Default Extension=".vsixmanifest" ContentType="text/xml"/>
</Types>`;

  fs.writeFileSync(path.join(stageDir, '[Content_Types].xml'), contentTypesXml, 'utf8');

  // 4. Generate extension.vsixmanifest
  const hasIcon = pkg.icon && fs.existsSync(path.join(ROOT_DIR, pkg.icon));
  const iconMetadata = hasIcon ? `    <Icon>extension/${pkg.icon.replace(/\\/g, '/')}</Icon>` : '';
  const iconAsset = hasIcon ? `    <Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/${pkg.icon.replace(/\\/g, '/')}" Addressable="true" />` : '';

  const hasLicense = fs.existsSync(path.join(ROOT_DIR, 'LICENSE'));
  const licenseAsset = hasLicense ? `    <Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE" Addressable="true" />` : '';

  const vsixManifest = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="${pkg.name}" Version="${pkg.version}" Publisher="${pkg.publisher}" />
    <DisplayName>${pkg.displayName}</DisplayName>
    <Description xml:space="preserve">${pkg.description}</Description>
    <Tags>${(pkg.keywords || []).join(',')}</Tags>
    <Categories>${(pkg.categories || []).join(',')}</Categories>
    <GalleryFlags>Public</GalleryFlags>
${iconMetadata}
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="${pkg.engines?.vscode || '^1.90.0'}" />
      <Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="ui,workspace,web" />
    </Properties>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
${iconAsset}
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/CHANGELOG.md" Addressable="true" />
${licenseAsset}
  </Assets>
</PackageManifest>`;

  fs.writeFileSync(path.join(stageDir, 'extension.vsixmanifest'), vsixManifest, 'utf8');

  // 5. Populate extension/ directory using native fs.cpSync
  const extDir = path.join(stageDir, 'extension');
  fs.mkdirSync(extDir, { recursive: true });

  const itemsToBundle = ['package.json', 'README.md', 'CHANGELOG.md', 'LICENSE', 'themes', 'icons', 'assets'];

  itemsToBundle.forEach((item) => {
    const srcPath = path.join(ROOT_DIR, item);
    const destPath = path.join(extDir, item);
    if (fs.existsSync(srcPath)) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    }
  });

  // 6. Compress staging directory into .vsix using PowerShell System.IO.Compression
  console.log('--- Step 4: Compressing Open Packaging Conventions Archive (POSIX format) ---');
  if (fs.existsSync(vsixOutput)) {
    fs.unlinkSync(vsixOutput);
  }

  // Create a temporary script file to avoid shell string escaping issues
  const scriptPath = path.join(ROOT_DIR, '.pack_temp.ps1');
  const psScriptContent = [
    'Add-Type -AssemblyName System.IO.Compression',
    'Add-Type -AssemblyName System.IO.Compression.FileSystem',
    `$dest = '${vsixOutput.replace(/'/g, "''")}'`,
    `$stage = '${stageDir.replace(/'/g, "''")}'`,
    '$zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create)',
    '$files = Get-ChildItem -Path $stage -Recurse -File',
    'foreach ($file in $files) {',
    '  $rel = $file.FullName.Substring($stage.Length).TrimStart("\\", "/").Replace("\\", "/")',
    '  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null',
    '}',
    '$zip.Dispose()'
  ].join('\r\n');

  fs.writeFileSync(scriptPath, psScriptContent, 'utf8');

  try {
    execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`, { stdio: 'inherit' });
  } catch (err) {
    throw new Error(`Failed to create VSIX archive: ${err.message}`);
  } finally {
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
    }
    safeRmDir(stageDir);
  }

  // 7. Structural verification of generated VSIX
  if (!fs.existsSync(vsixOutput)) {
    throw new Error(`VSIX output was not created at ${vsixOutput}`);
  }

  const sizeKb = (fs.statSync(vsixOutput).size / 1024).toFixed(1);

  const verifyScriptPath = path.join(ROOT_DIR, '.verify_temp.ps1');
  const verifyScriptContent = [
    'Add-Type -AssemblyName System.IO.Compression.FileSystem',
    `$dest = '${vsixOutput.replace(/'/g, "''")}'`,
    '$zip = [System.IO.Compression.ZipFile]::OpenRead($dest)',
    '$entries = $zip.Entries | Select-Object -ExpandProperty FullName',
    'Write-Output ("Total entries: " + $entries.Count)',
    '$entries',
    '$zip.Dispose()'
  ].join('\r\n');

  fs.writeFileSync(verifyScriptPath, verifyScriptContent, 'utf8');
  let verifyOut = '';
  try {
    verifyOut = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${verifyScriptPath}"`).toString().trim();
  } finally {
    if (fs.existsSync(verifyScriptPath)) {
      fs.unlinkSync(verifyScriptPath);
    }
  }

  console.log(`\n✨ [Xeoo Package Complete] Installer successfully generated:`);
  console.log(`   • File: ${vsixName}`);
  console.log(`   • Size: ${sizeKb} KB`);
  console.log(`   • Destination: ${vsixOutput}`);
  console.log(`\n--- VSIX Archive Structure Inspection (POSIX Paths) ---`);
  console.log(verifyOut);
  console.log('');
}

if (require.main === module) {
  try {
    packageExtension();
  } catch (err) {
    console.error(`❌ [Packaging Failed]: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { packageExtension };

