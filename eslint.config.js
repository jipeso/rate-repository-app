import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";
import babelParser from "@babel/eslint-parser";

import expo from "eslint-config-expo/flat.js";
import jest from "eslint-plugin-jest";
import prettier from "eslint-config-prettier/flat";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  expo,
  jest.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: "latest",
    },
  },
]);
