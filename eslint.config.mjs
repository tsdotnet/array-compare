import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nodePlugin from 'eslint-plugin-n';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			n: nodePlugin
		},
		rules: {
			"semi": ["warn", "always"],
			"indent": ["warn", "tab", { "SwitchCase": 1 }],
			"@typescript-eslint/no-explicit-any": "off"
		},
		files: ['src/**/*.ts'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				console: 'readonly',
				process: 'readonly'
			}
		}
	}
);
