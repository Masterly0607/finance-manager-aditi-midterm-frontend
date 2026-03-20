import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";

export default defineConfig([
  nextConfig,
  {
    rules: {
      "prefer-const": "error",
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "components/ui/**"]),
]);
