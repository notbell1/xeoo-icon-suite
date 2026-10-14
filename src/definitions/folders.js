/**
 * Xeoo Icon Theme - Folder Definitions
 * 
 * Defines folder mappings and their corresponding icon definitions.
 * All paths must be relative to the project root.
 */

module.exports = {
  // Base folder fallbacks
  defaults: {
    folder: {
      id: '_folder',
      path: 'icons/base/folder.svg',
      description: 'Default closed cybernetic vault folder'
    },
    folderExpanded: {
      id: '_folder_open',
      path: 'icons/base/folder-open.svg',
      description: 'Default open cybernetic vault folder'
    }
  },

  // Directory name mappings: folderName -> iconId
  folderNames: {
    'src': '_folder_src',
    'source': '_folder_src',
    'sources': '_folder_src',
    'components': '_folder_components',
    'widgets': '_folder_components',
    'assets': '_folder_assets',
    'static': '_folder_assets',
    'media': '_folder_assets',
    'images': '_folder_assets',
    'public': '_folder_public',
    'www': '_folder_public',
    'html': '_folder_public',
    'tests': '_folder_tests',
    'test': '_folder_tests',
    '__tests__': '_folder_tests',
    'spec': '_folder_tests',
    'docs': '_folder_docs',
    'doc': '_folder_docs',
    'documentation': '_folder_docs',
    'config': '_folder_config',
    'configs': '_folder_config',
    'settings': '_folder_config',
    '.github': '_folder_github',
    '.git': '_folder_github',
    '.vscode': '_folder_vscode'
  },

  // Directory open state mappings: folderName -> iconId
  folderNamesExpanded: {
    'src': '_folder_src_open',
    'source': '_folder_src_open',
    'sources': '_folder_src_open',
    'components': '_folder_components_open',
    'widgets': '_folder_components_open',
    'assets': '_folder_assets_open',
    'static': '_folder_assets_open',
    'media': '_folder_assets_open',
    'images': '_folder_assets_open',
    'public': '_folder_public_open',
    'www': '_folder_public_open',
    'html': '_folder_public_open',
    'tests': '_folder_tests_open',
    'test': '_folder_tests_open',
    '__tests__': '_folder_tests_open',
    'spec': '_folder_tests_open',
    'docs': '_folder_docs_open',
    'doc': '_folder_docs_open',
    'documentation': '_folder_docs_open',
    'config': '_folder_config_open',
    'configs': '_folder_config_open',
    'settings': '_folder_config_open',
    '.github': '_folder_github_open',
    '.git': '_folder_github_open',
    '.vscode': '_folder_vscode_open'
  },

  // Custom icon definitions registered by this module
  icons: {
    _folder_src: { path: 'icons/folders/folder-src.svg', description: 'Source Folder (Closed)' },
    _folder_src_open: { path: 'icons/folders/folder-src-open.svg', description: 'Source Folder (Open)' },
    _folder_components: { path: 'icons/folders/folder-components.svg', description: 'Components Folder (Closed)' },
    _folder_components_open: { path: 'icons/folders/folder-components-open.svg', description: 'Components Folder (Open)' },
    _folder_assets: { path: 'icons/folders/folder-assets.svg', description: 'Assets Folder (Closed)' },
    _folder_assets_open: { path: 'icons/folders/folder-assets-open.svg', description: 'Assets Folder (Open)' },
    _folder_public: { path: 'icons/folders/folder-public.svg', description: 'Public Folder (Closed)' },
    _folder_public_open: { path: 'icons/folders/folder-public-open.svg', description: 'Public Folder (Open)' },
    _folder_tests: { path: 'icons/folders/folder-tests.svg', description: 'Tests Folder (Closed)' },
    _folder_tests_open: { path: 'icons/folders/folder-tests-open.svg', description: 'Tests Folder (Open)' },
    _folder_docs: { path: 'icons/folders/folder-docs.svg', description: 'Documentation Folder (Closed)' },
    _folder_docs_open: { path: 'icons/folders/folder-docs-open.svg', description: 'Documentation Folder (Open)' },
    _folder_config: { path: 'icons/folders/folder-config.svg', description: 'Configuration Folder (Closed)' },
    _folder_config_open: { path: 'icons/folders/folder-config-open.svg', description: 'Configuration Folder (Open)' },
    _folder_github: { path: 'icons/folders/folder-github.svg', description: 'GitHub / Git Folder (Closed)' },
    _folder_github_open: { path: 'icons/folders/folder-github-open.svg', description: 'GitHub / Git Folder (Open)' },
    _folder_vscode: { path: 'icons/folders/folder-vscode.svg', description: 'VS Code Folder (Closed)' },
    _folder_vscode_open: { path: 'icons/folders/folder-vscode-open.svg', description: 'VS Code Folder (Open)' }
  }
};
