/**
 * Xeoo Icon Theme - Filename Definitions
 * 
 * Defines exact filename mappings and their corresponding icon definitions.
 * All paths must be relative to the project root.
 */

module.exports = {
  // Exact filename mappings: filename -> iconId
  fileNames: {
    // Node Package Manifest
    'package.json': '_file_package_json',
    'package-lock.json': '_file_package_json',

    // TypeScript & JavaScript Configs (Explicit patterns due to lack of wildcard support in VS Code)
    'tsconfig.json': '_file_tsconfig',
    'tsconfig.base.json': '_file_tsconfig',
    'tsconfig.build.json': '_file_tsconfig',
    'tsconfig.node.json': '_file_tsconfig',
    'tsconfig.app.json': '_file_tsconfig',
    'tsconfig.esm.json': '_file_tsconfig',
    'tsconfig.paths.json': '_file_tsconfig',
    'jsconfig.json': '_file_tsconfig',

    // Environment Configurations
    '.env': '_file_env',
    '.env.local': '_file_env',
    '.env.development': '_file_env',
    '.env.dev': '_file_env',
    '.env.production': '_file_env',
    '.env.prod': '_file_env',
    '.env.test': '_file_env',
    '.env.staging': '_file_env',
    '.env.example': '_file_env_example',
    '.env.sample': '_file_env_example',
    '.env.defaults': '_file_env',

    // Git Configuration & Metadata
    '.gitignore': '_file_gitignore',
    '.gitattributes': '_file_gitattributes',
    '.gitmodules': '_file_git',
    '.gitkeep': '_file_git',

    // Docker & Containers
    'Dockerfile': '_file_docker',
    'dockerfile': '_file_docker',
    'docker-compose.yml': '_file_docker',
    'docker-compose.yaml': '_file_docker',
    'compose.yaml': '_file_docker',
    'compose.yml': '_file_docker',
    '.dockerignore': '_file_docker',

    // Documentation & Readme
    'README.md': '_file_markdown',
    'README': '_file_markdown',
    'README.txt': '_file_markdown',
    'readme.md': '_file_markdown',
    'readme': '_file_markdown',

    // Licensing & Terms
    'LICENSE': '_file_license',
    'LICENCE': '_file_license',
    'LICENSE.md': '_file_license',
    'LICENCE.md': '_file_license',
    'license': '_file_license',
    'licence': '_file_license',

    // Vite Build Tooling
    'vite.config.ts': '_file_vite',
    'vite.config.js': '_file_vite',
    'vite.config.mjs': '_file_vite',
    'vite.config.cjs': '_file_vite',

    // Tailwind CSS
    'tailwind.config.js': '_file_tailwind',
    'tailwind.config.cjs': '_file_tailwind',
    'tailwind.config.mjs': '_file_tailwind',
    'tailwind.config.ts': '_file_tailwind',

    // Next.js
    'next.config.js': '_file_next',
    'next.config.mjs': '_file_next',
    'next.config.ts': '_file_next',
    'next.config.cjs': '_file_next',

    // PHPUnit
    'phpunit.xml': '_file_phpunit',
    'phpunit.xml.dist': '_file_phpunit',
    'phpunit.dist.xml': '_file_phpunit',

    // Angular
    'angular.json': '_file_angular',

    // Rust Cargo Manifest & Lockfile
    'Cargo.toml': '_file_toml',
    'cargo.toml': '_file_toml',
    'Cargo.lock': '_file_toml',
    'cargo.lock': '_file_toml'
  },

  // Custom icon definitions registered by this module
  icons: {
    _file_package_json: { path: 'icons/files/package-json.svg', description: 'Node Package Manifest' },
    _file_tsconfig: { path: 'icons/files/tsconfig.svg', description: 'TypeScript Config' },
    _file_env: { path: 'icons/files/env.svg', description: 'Environment Configuration' },
    _file_env_example: { path: 'icons/files/env-example.svg', description: 'Environment Template / Example' },
    _file_git: { path: 'icons/files/git.svg', description: 'Git Configuration / Attributes' },
    _file_gitignore: { path: 'icons/files/git-ignore.svg', description: 'Git Ignore Configuration' },
    _file_gitattributes: { path: 'icons/files/git-attributes.svg', description: 'Git Attributes Configuration' },
    _file_docker: { path: 'icons/files/docker.svg', description: 'Docker Container Configuration' },
    _file_license: { path: 'icons/files/license.svg', description: 'License / Legal Notice' },
    _file_vite: { path: 'icons/files/vite.svg', description: 'Vite Build Configuration' },
    _file_tailwind: { path: 'icons/frameworks/tailwind.svg', description: 'Tailwind CSS Configuration' },
    _file_next: { path: 'icons/frameworks/next.svg', description: 'Next.js Configuration' },
    _file_phpunit: { path: 'icons/frameworks/phpunit.svg', description: 'PHPUnit Test Configuration' },
    _file_angular: { path: 'icons/frameworks/angular.svg', description: 'Angular CLI Configuration' }
  }
};
