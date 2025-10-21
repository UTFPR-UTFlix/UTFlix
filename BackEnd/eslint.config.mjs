import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // Esta é a configuração principal
  {
    files: ["**/*.{js,mjs,cjs}"], // Quais arquivos verificar
    languageOptions: {
      globals: {
        ...globals.node // <-- CORRIGIDO: Mudei de 'browser' para 'node'
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // Adicione suas regras personalizadas aqui
      // Ex: "semi": ["error", "always"]
    }
  },
  
  // Esta parte diz o que IGNORAR
  {
    ignores: [
      "**/node_modules/", // Ignora todas as pastas node_modules
      "pgdata/" // Ignora a pasta do banco
    ]
  }
];