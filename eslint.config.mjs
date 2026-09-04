import security from 'eslint-plugin-security';
export default [
  { ignores: ['node_modules/**','dist/**','build/**','assets/**','playwright-report/**','test-results/**'] },
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { security },
    rules: { ...security.configs.recommended.rules },
  },
];
