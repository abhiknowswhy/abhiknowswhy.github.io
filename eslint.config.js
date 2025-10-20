import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsonc from 'eslint-plugin-jsonc'

export default tseslint.config([
	{
		ignores: ['dist/**', 'node_modules/**']
	},
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
		],
		plugins: {
			react: react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			// React hooks rules
			...reactHooks.configs.recommended.rules,
			// React refresh rules
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			// Enforce tabs for indentation
			'indent': ['error', 'tab', { 
				'SwitchCase': 1,
				'VariableDeclarator': 1,
				'outerIIFEBody': 1,
				'MemberExpression': 1,
				'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
				'FunctionExpression': { 'parameters': 1, 'body': 1 },
				'CallExpression': { 'arguments': 1 },
				'ArrayExpression': 1,
				'ObjectExpression': 1,
				'ImportDeclaration': 1,
				'flatTernaryExpressions': false,
				'ignoreComments': false
			}],
			// Enforce tabs in JSX
			'react/jsx-indent': ['error', 'tab'],
			'react/jsx-indent-props': ['error', 'tab']
		},
	},
	{
		files: ['**/*.{js,jsx}'],
		extends: [js.configs.recommended],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'indent': ['error', 'tab']
		},
	},
	// All JSON files configuration (JSONC allows comments)
	{
		files: ['**/*.json'],
		extends: [
			...jsonc.configs['flat/recommended-with-jsonc']
		],
		rules: {
			'jsonc/indent': ['error', 'tab'],
			'jsonc/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
			'jsonc/object-curly-spacing': ['error', 'never'],
			'jsonc/array-bracket-spacing': ['error', 'never']
		}
	}
])
