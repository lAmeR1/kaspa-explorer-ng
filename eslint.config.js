import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksRecommended from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ignores: ['node_modules', 'eslist.config.js'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: false,
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 2022,
                sourceType: 'module',
                jsx: true
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react': reactRecommended.plugins.react,
            'react-hooks': reactHooksRecommended
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...reactRecommended.rules,
            ...reactHooksRecommended.configs.recommended.rules,

            // Wichtige persönliche Anpassungen:
            '@typescript-eslint/no-unused-vars': ['warn', {args: 'after-used', ignoreRestSiblings: true}],
            'no-unused-vars': 'off',
            'react/react-in-jsx-scope': 'off', // React nicht zwingend importieren (ab React 17+)
            'react/prop-types': 'off',         // Wird meist nicht benötigt bei TypeScript
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            semi: ['error', 'always'],
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];