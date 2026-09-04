import { FlatCompat } from "@eslint/eslintrc";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.config({
    extends: ["prettier"],
  }),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "libs/generated/**", , "next-env.d.ts"],
  },
];

export default eslintConfig;
