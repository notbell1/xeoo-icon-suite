/**
 * Xeoo Icon Theme - File Extension Definitions
 * 
 * Defines extension mappings and their corresponding icon definitions.
 * All paths must be relative to the project root.
 */

module.exports = {
  // Base file fallback
  defaults: {
    file: {
      id: '_file',
      path: 'icons/base/file.svg',
      description: 'Default fallback file data-plate'
    }
  },

  // Extension mappings: extension without leading dot -> iconId
  fileExtensions: {
    // Phase 04: Web Languages
    'js': '_lang_javascript',
    'mjs': '_lang_javascript',
    'cjs': '_lang_javascript',
    'ts': '_lang_typescript',
    'mts': '_lang_typescript',
    'cts': '_lang_typescript',
    'jsx': '_file_react_jsx',
    'tsx': '_file_react_tsx',
    'html': '_lang_html',
    'htm': '_lang_html',
    'css': '_lang_css',
    'scss': '_lang_scss',
    'sass': '_lang_scss',
    'less': '_lang_less',

    // Phase 04: Documentation
    'md': '_file_markdown',
    'markdown': '_file_markdown',
    'mdown': '_file_markdown',
    'mkd': '_file_markdown',

    // Media & Archives
    'svg': '_file_svg',
    'gif': '_file_gif',
    'zip': '_file_zip',
    'tar': '_file_zip',
    'gz': '_file_zip',
    '7z': '_file_zip',
    'rar': '_file_zip',

    // Phase 05: Backend Languages & Runtimes
    'php': '_lang_php',
    'phtml': '_lang_php',
    'php3': '_lang_php',
    'php4': '_lang_php',
    'php5': '_lang_php',
    'php7': '_lang_php',
    'php8': '_lang_php',
    'phps': '_lang_php',
    'phar': '_lang_php',
    'py': '_lang_python',
    'pyw': '_lang_python',
    'pyi': '_lang_python',
    'java': '_lang_java',
    'jar': '_lang_java',
    'class': '_lang_java',
    'cs': '_lang_csharp',
    'csx': '_lang_csharp',
    'go': '_lang_go',
    'rs': '_lang_rust',
    'rb': '_lang_ruby',
    'erb': '_lang_ruby',
    'lua': '_lang_lua',
    'luau': '_lang_lua',
    'dart': '_lang_dart',

    // Phase 05: Framework Templates
    'blade.php': '_file_blade',
    'vue': '_file_vue',
    'svelte': '_file_svelte',
    'astro': '_file_astro',

    // Phase 05: Data Formats & API
    'json': '_file_json',
    'jsonc': '_file_json',
    'json5': '_file_json',
    'yaml': '_file_yaml',
    'yml': '_file_yaml',
    'toml': '_file_toml',
    'xml': '_file_xml',
    'xsd': '_file_xml',
    'xsl': '_file_xml',
    'sql': '_file_sql',
    'sqlite': '_file_sql',
    'pgsql': '_file_sql',
    'mysql': '_file_sql',
    'graphql': '_file_graphql',
    'gql': '_file_graphql',
    'csv': '_file_csv',
    'tsv': '_file_csv',
    'proto': '_file_protobuf',

    // Phase 05: Game Development & Shaders
    'gd': '_file_godot',
    'tscn': '_file_godot',
    'tres': '_file_godot',
    'godot': '_file_godot',
    'glsl': '_file_shader',
    'vert': '_file_shader',
    'frag': '_file_shader',
    'hlsl': '_file_shader',
    'shader': '_file_shader',
    'wgsl': '_file_shader',
    'comp': '_file_shader',
    'geom': '_file_shader',
    'wasm': '_file_wasm',
    'wat': '_file_wasm',
    'unity': '_file_unity',
    'prefab': '_file_unity'
  },

  // Custom icon definitions registered by this module
  icons: {
    // Phase 04
    _lang_javascript: { path: 'icons/languages/javascript.svg', description: 'JavaScript Source' },
    _lang_typescript: { path: 'icons/languages/typescript.svg', description: 'TypeScript Source' },
    _file_react_jsx: { path: 'icons/languages/react-jsx.svg', description: 'React JSX Component' },
    _file_react_tsx: { path: 'icons/languages/react-tsx.svg', description: 'React TSX Component' },
    _lang_html: { path: 'icons/languages/html.svg', description: 'HTML Hypertext Document' },
    _lang_css: { path: 'icons/languages/css.svg', description: 'CSS Cascade Stylesheet' },
    _lang_scss: { path: 'icons/languages/scss.svg', description: 'SCSS/Sass Stylesheet' },
    _file_markdown: { path: 'icons/files/markdown.svg', description: 'Markdown Document' },

    // Phase 05: Backend Languages
    _lang_php: { path: 'icons/languages/php.svg', description: 'PHP Script' },
    _lang_python: { path: 'icons/languages/python.svg', description: 'Python Script' },
    _lang_java: { path: 'icons/languages/java.svg', description: 'Java Source' },
    _lang_csharp: { path: 'icons/languages/csharp.svg', description: 'C# Source' },
    _lang_go: { path: 'icons/languages/go.svg', description: 'Go Source' },
    _lang_rust: { path: 'icons/languages/rust.svg', description: 'Rust Source' },
    _lang_ruby: { path: 'icons/languages/ruby.svg', description: 'Ruby Source' },
    _lang_lua: { path: 'icons/languages/lua.svg', description: 'Lua / Luau Script' },
    _lang_dart: { path: 'icons/languages/dart.svg', description: 'Dart Source' },

    // Phase 05: Frameworks
    _file_blade: { path: 'icons/frameworks/blade.svg', description: 'Laravel Blade Template' },
    _file_vue: { path: 'icons/frameworks/vue.svg', description: 'Vue Single File Component' },
    _file_svelte: { path: 'icons/frameworks/svelte.svg', description: 'Svelte Component' },
    _file_astro: { path: 'icons/frameworks/astro.svg', description: 'Astro Component' },

    // Phase 05: Data Formats
    _file_json: { path: 'icons/files/json.svg', description: 'JSON Data File' },
    _file_yaml: { path: 'icons/files/yaml.svg', description: 'YAML Data File' },
    _file_toml: { path: 'icons/files/toml.svg', description: 'TOML Data File' },
    _file_xml: { path: 'icons/files/xml.svg', description: 'XML Document' },
    _file_sql: { path: 'icons/files/sql.svg', description: 'SQL Database Script' },
    _file_graphql: { path: 'icons/files/graphql.svg', description: 'GraphQL Schema / Query' },
    _file_csv: { path: 'icons/files/csv.svg', description: 'CSV Tabular Data' },
    _file_protobuf: { path: 'icons/files/protobuf.svg', description: 'Protocol Buffers Schema' },

    // Phase 05: Game Development & Shaders
    _file_godot: { path: 'icons/files/godot.svg', description: 'Godot Engine Script / Scene' },
    _file_shader: { path: 'icons/files/shader.svg', description: 'Graphics Shader Source' },
    _file_wasm: { path: 'icons/files/wasm.svg', description: 'WebAssembly Binary / Text' },
    _file_unity: { path: 'icons/files/unity.svg', description: 'Unity Engine Asset' },

    // Phase 05.1 Refinement Suite
    _lang_less: { path: 'icons/languages/less.svg', description: 'Less Stylesheet' },
    _file_zip: { path: 'icons/files/zip.svg', description: 'Compressed Archive Package' },
    _file_gif: { path: 'icons/files/gif.svg', description: 'GIF Animated Graphic' },
    _file_svg: { path: 'icons/files/svg.svg', description: 'Scalable Vector Graphic' }
  }
};
