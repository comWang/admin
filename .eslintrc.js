const prettierRules = require('./.prettierrc')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'error',
    'no-async-promise-executor': 0,
    semi: ['error', prettierRules.semi ? 'always' : 'never'],
    quotes: ['error', prettierRules.singleQuote ? 'single' : 'double'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-multi-spaces': 'error',
    'max-len': [
      'error',
      {
        code: prettierRules.printWidth || 100,
        tabWidth: prettierRules.tabWidth || 2,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        functions: 'never',
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
  },
}
