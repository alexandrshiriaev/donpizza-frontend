module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        quotes: ['error', 'single'],
        semi: 'warn',
        '@typescript-eslint/ban-ts-comment': 0,
    },
    parserOptions: {
        ecmaScript: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
    },
};
