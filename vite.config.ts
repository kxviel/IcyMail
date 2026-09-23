import process from "node:process";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,

    semi: true,
    singleQuote: false,
    trailingComma: "all",

    sortImports: true,

    sortTailwindcss: true,

    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  lint: {
    categories: {
      correctness: "error",
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          fix: {
            imports: "safe-fix",
            variables: "off",
          },
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    ignorePatterns: ["public/favicon.svg", "src/routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  plugins: lazyPlugins(() => [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react({
      compiler: true,
    }),
  ]),

  /* Aliasing */
  resolve: {
    tsconfigPaths: true,
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
});
