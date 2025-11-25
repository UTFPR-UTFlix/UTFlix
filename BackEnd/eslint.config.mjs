import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,   // Node.js
        ...globals.jest    // <-- Adicione isto para reconhecer describe/it/expect
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // Adicione suas regras personalizadas aqui
    }
  },

  {
    ignores: [
      "**/node_modules/",
      "pgdata/"
    ]
  }
];
