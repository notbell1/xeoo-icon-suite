# Changelog

All notable changes to the **Xeoo Icon Theme** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - Icon Identity & Visual Refinement

### Added
- **Dedicated Git & Environment Dotfile Icons**:
  - `.gitignore` (`icons/files/git-ignore.svg`) — Git branch diamond with a prominent, high-contrast diagonal ignore bar.
  - `.gitattributes` (`icons/files/git-attributes.svg`) — Git branch diamond integrated with attribute slider tuning rails.
  - `.env.example`, `.env.sample` (`icons/files/env-example.svg`) — Blueprint-style dashed power cell with outline voltage glyph.
- **Media, Archive & Styling Extensions**:
  - Less: `.less` (`icons/languages/less.svg`) — Hexagonal frame with mathematical cybernetic less-than (`≤`) angle.
  - Archives: `.zip`, `.tar`, `.gz`, `.7z`, `.rar` (`icons/files/zip.svg`) — Compressed cyber-vault with interlocking zipper teeth track and pull tab.
  - Animated Graphics: `.gif` (`icons/files/gif.svg`) — Film-strip aperture with playback triangle and looping velocity chevrons.
  - Vector Graphics: `.svg` (`icons/files/svg.svg`) — Precision bezier curve with tangent control handles and diamond anchor points.

### Refined
- **PHP Identity (`icons/languages/php.svg`)**: Redesigned with an unmistakable cybernetic "PHP" monogram in Neon Cyan and Primary Violet for immediate recognition at 16×16 px.
- **Laravel Blade Identity (`icons/frameworks/blade.svg`)**: Replaced ambiguous crossed lines with a sleek cyber-katana razor blade with high-frequency cutting edge and hilt telemetry node.
- **Markdown Identity (`icons/files/markdown.svg`)**: Replaced cramped glyph with a bold, wide cybernetic "M" monogram and integrated down-chevron arrow across the data plate.
- **HTML Identity (`icons/languages/html.svg`)**: Replaced generic brackets with a bold 5-point cybernetic shield chassis enclosing high-contrast angle brackets and forward slash.
- **Git Identity (`icons/files/git.svg`)**: Removed ignore slash to restore clean Git branch topology for `.gitmodules`, `.gitkeep`, etc.
- **Active Environment Identity (`icons/files/env.svg`)**: Upgraded to a solid, fully charged power cell with vivid Cyber Mint lightning bolt.
- **TOML & YAML Identities (`icons/files/toml.svg`, `icons/files/yaml.svg`)**: Strengthened T-girder and Y-branching tree structures for enhanced contrast and optical weight.
- **Generic File Plate (`icons/base/file.svg`)**: Expanded to 80% artboard occupancy with reinforced telemetry rails for balanced weight against folder icons.
- **Test Fixture Suite**: Added all representative test files (`app.php`, `welcome.blade.php`, `layout.blade.php`, `style.less`, `logo.svg`, `settings.yml`).
- **Validation Pipeline**: Expanded automated precedence test suite in `src/validate.js` from 82 to 96 passing test cases.

---

## [Phase 05.1] - 2026-10-14

### Added
- **Backend Languages & Runtimes (9 new SVG identities)**:
  - PHP: `.php`, `.phtml`, `.php3`, `.php4`, `.php5`, `.php7`, `.php8`, `.phps`, `.phar` (`icons/languages/php.svg`) — dual micro-chip telemetry pinout with rounded cyber-pill.
  - Python: `.py`, `.pyw`, `.pyi` (`icons/languages/python.svg`) — interlocking dual-tone cybernetic serpents with node eyes.
  - Java: `.java`, `.jar`, `.class` (`icons/languages/java.svg`) — geometric thermal vapors rising from insulated cybernetic cup.
  - C#: `.cs`, `.csx` (`icons/languages/csharp.svg`) — cybernetic C-crescent enclosure with neon sharp matrix grid.
  - Go: `.go` (`icons/languages/go.svg`) — dual optical visor gopher silhouette with velocity streak vector rails.
  - Rust: `.rs` (`icons/languages/rust.svg`) — radial 8-cog telemetry gear encircling stylized R-chassis core.
  - Ruby: `.rb`, `.erb` (`icons/languages/ruby.svg`) — precision-faceted cyber-gem with illuminated cyan core prism.
  - Lua: `.lua`, `.luau` (`icons/languages/lua.svg`) — orbital celestial satellite system with primary node and neon moonlet.
  - Dart: `.dart` (`icons/languages/dart.svg`) — high-velocity forward cyber-delta kite with layered telemetry facets.
- **Frameworks, Templates & Tooling (8 new SVG identities)**:
  - Laravel Blade: `.blade.php` (`icons/frameworks/blade.svg`) — cyber-katana blade slashing across template carrier plate.
  - Vue: `.vue` (`icons/frameworks/vue.svg`) — nested dual-chevron cyber-delta with central core telemetry pupil.
  - Svelte: `.svelte` (`icons/frameworks/svelte.svg`) — high-velocity twin-curve cyber-sigil with illuminated orbital nodes.
  - Astro: `.astro` (`icons/frameworks/astro.svg`) — atmospheric cyber-rocket booster with rocket exhaust trail.
  - Tailwind CSS: `tailwind.config.*` (`icons/frameworks/tailwind.svg`) — dual-wave aerodynamic fluid velocity rails.
  - Next.js: `next.config.*` (`icons/frameworks/next.svg`) — cyber-ring aperture with high-speed diagonal ray trace.
  - PHPUnit: `phpunit.xml*` (`icons/frameworks/phpunit.svg`) — diagnostic test suite module with verified telemetry checkmark.
  - Angular CLI: `angular.json` (`icons/frameworks/angular.svg`) — high-angle cybernetic chevron shield with A-core crossbar.
- **Data Formats & APIs (8 new SVG identities)**:
  - JSON: `.json`, `.jsonc`, `.json5` (`icons/files/json.svg`) — structured object payload braces with data pulse beacon.
  - YAML: `.yaml`, `.yml` (`icons/files/yaml.svg`) — branching configuration node tree with mint data junction.
  - TOML: `.toml`, `Cargo.lock`, `Cargo.toml` (`icons/files/toml.svg`) — tabular key-value matrix rails with dual bus endpoints.
  - XML: `.xml`, `.xsd`, `.xsl` (`icons/files/xml.svg`) — semantic hypertext angle tags with slash-delimiter rail.
  - SQL: `.sql`, `.sqlite`, `.pgsql`, `.mysql` (`icons/files/sql.svg`) — stacked relational database cylinder sectors with query pulse.
  - GraphQL: `.graphql`, `.gql` (`icons/files/graphql.svg`) — hexagonal schema node graph with interconnecting vector bus.
  - CSV: `.csv`, `.tsv` (`icons/files/csv.svg`) — tabular coordinate grid cell matrix with telemetry sample nodes.
  - Protocol Buffers: `.proto` (`icons/files/protobuf.svg`) — compact binary wire-format envelope with crosshair serialization node.
- **Game Development & Shaders (4 new SVG identities)**:
  - Godot Engine: `.gd`, `.tscn`, `.tres`, `.godot` (`icons/files/godot.svg`) — cybernetic robotic controller face with antenna bus.
  - Shaders: `.glsl`, `.hlsl`, `.vert`, `.frag`, `.shader`, `.wgsl` (`icons/files/shader.svg`) — GPU polygon render prism with illuminated raster core.
  - WebAssembly: `.wasm`, `.wat` (`icons/files/wasm.svg`) — low-level binary bytecode polygon module with neon W-trace bus.
  - Unity Engine: `.unity`, `.prefab` (`icons/files/unity.svg`) — tri-directional coordinate axis hub with spatial pivot core (safely scoped to exclude generic `.asset` and `.meta` files).
- **Phase 05.1 Corrective Audit & Precedence Verification**:
  - Replaced range notation `.php4-8` with explicit list of standard PHP extensions (`.php`, `.phtml`, `.php3`, `.php4`, `.php5`, `.php7`, `.php8`, `.phps`, `.phar`).
  - Removed generic `.asset` and `.meta` from Unity mapping to prevent false-positive global hijacking across non-Unity repositories.
  - Verified explicit filename mapping for all Tailwind, Next.js, and PHPUnit configuration variations without relying on wildcards.
  - Expanded resolution test suite in `src/validate.js` from 63 to 82 tests, covering all PHP extensions, Blade overrides, Unity scoping, and config variants.
- **Multi-Part Extension Precedence Engine**:
  - Implemented multi-part extension precedence in VS Code manifest mapping (`blade.php` takes precedence over `.php`).
  - Implemented exact filename precedence for build configs (`tailwind.config.*`, `next.config.*`, `phpunit.xml*`, `angular.json`, `Cargo.lock`).
- **Resolution & Collision Test Suite Expansion**:
  - Expanded test coverage in `src/validate.js` from 28 to 63 automated precedence and collision tests.
  - Verified exact override behavior across all newly added languages, frameworks, and data formats.
- **Phase 05 Vector Specimen Preview**:
  - Added standalone SVG specimen sheet: `assets/previews/phase-05-suite.svg` showing all 29 icons on Dark+ and Light+ palettes with 16x16 micro scale tree simulation.

---

## [Phase 04] - 2026-10-14

### Added
- **Core Folder Icons (10 categories, 20 SVGs with 100% open/closed parity)**:
  - Default: cybernetic vault (`icons/base/folder.svg`, `folder-open.svg`)
  - `src`, `source`, `sources`: code chevrons motif (`icons/folders/folder-src.svg`, `folder-src-open.svg`)
  - `components`, `widgets`: modular cube/diamond cluster motif (`icons/folders/folder-components.svg`, `folder-components-open.svg`)
  - `assets`, `static`, `media`, `images`: framed media node motif (`icons/folders/folder-assets.svg`, `folder-assets-open.svg`)
  - `public`, `www`, `html`: broadcast signal beacon motif (`icons/folders/folder-public.svg`, `folder-public-open.svg`)
  - `tests`, `test`, `__tests__`, `spec`: calibration target crosshair motif (`icons/folders/folder-tests.svg`, `folder-tests-open.svg`)
  - `docs`, `doc`, `documentation`: structured data rails motif (`icons/folders/folder-docs.svg`, `folder-docs-open.svg`)
  - `config`, `configs`, `settings`: angular servo gear motif (`icons/folders/folder-config.svg`, `folder-config-open.svg`)
  - `.github`, `.git`: cybernetic branching node motif (`icons/folders/folder-github.svg`, `folder-github-open.svg`)
  - `.vscode`: VS Code angled prism ribbon motif (`icons/folders/folder-vscode.svg`, `folder-vscode-open.svg`)
- **Web Languages Suite (7 SVG identities)**:
  - JavaScript: `.js`, `.mjs`, `.cjs` (`icons/languages/javascript.svg`)
  - TypeScript: `.ts`, `.mts`, `.cts` (`icons/languages/typescript.svg`)
  - React JSX: `.jsx` (`icons/languages/react-jsx.svg`)
  - React TSX: `.tsx` (`icons/languages/react-tsx.svg`)
  - HTML: `.html`, `.htm` (`icons/languages/html.svg`)
  - CSS: `.css` (`icons/languages/css.svg`)
  - SCSS/Sass: `.scss`, `.sass` (`icons/languages/scss.svg`)
- **Essential Configurations & File Suite (8 new SVGs + 1 base)**:
  - Node Manifest: `package.json`, `package-lock.json` (`icons/files/package-json.svg`)
  - TypeScript Configs: `tsconfig.json`, `tsconfig.*.json`, `jsconfig.json` (`icons/files/tsconfig.svg`)
  - Environment: `.env`, `.env.*` (`icons/files/env.svg`)
  - Git Config: `.gitignore`, `.gitattributes`, `.gitmodules`, `.gitkeep` (`icons/files/git.svg`)
  - Container Tooling: `Dockerfile`, `docker-compose.yml`, `compose.yaml`, `.dockerignore` (`icons/files/docker.svg`)
  - Documentation: `README.md`, `README`, `*.md`, `*.markdown` (`icons/files/markdown.svg`)
  - Licensing: `LICENSE`, `LICENCE`, `license` (`icons/files/license.svg`)
  - Build Tooling: `vite.config.ts`, `vite.config.js`, `vite.config.mjs`, `vite.config.cjs` (`icons/files/vite.svg`)
- **Precedence & Collision Resolution Suite**: Added automated tests to `src/validate.js` verifying exact filename precedence over extensions (e.g. `vite.config.ts` vs `.ts`, `package.json` vs `.json`, `.env.local` vs extensions).
- **Specimen Preview Sheet**: Added `assets/previews/phase-04-suite.svg` previewing all 36 icons in dark and light contexts at 32x32 and 16x16.

---

## [0.1.0] - 2026-10-14

### Added
- **Initial Project Scaffolding**: Setup modular structure for `xeoo-icon-theme` extension.
- **Extension Manifest**: Configured `package.json` with official VS Code `contributes.iconThemes` contribution point.
- **Modular Definition Engine**: Added definition modules for `folders.js`, `extensions.js`, `filenames.js`, and `languages.js`.
- **Native Build Pipeline**: Implemented `src/build.js` to compile modular definitions into `themes/xeoo-icon-theme.json` with zero external dependencies.
- **Validation Pipeline**: Implemented `src/validate.js` covering SVG viewBox (`0 0 32 32`), prohibited script/filter detection, missing file checks, and folder open/closed symmetry.
- **Standalone VSIX Packager**: Implemented `src/package.js` using native Node.js and PowerShell/.NET compression APIs.
- **Base Fallback Icons**: Created initial 32x32 cybernetic fallback icons:
  - `file.svg`: Chamfered cybernetic data-plate document
  - `folder.svg`: Closed cybernetic vault folder with diamond telemetry node
  - `folder-open.svg`: Open cybernetic vault folder with illuminated substrate
- **Extension Host Debugging**: Added `.vscode/launch.json` for one-click testing in VS Code Extension Development Host.
