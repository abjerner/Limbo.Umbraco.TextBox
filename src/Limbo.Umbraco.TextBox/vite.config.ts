import { defineConfig } from 'vite';

// [CHANGE: upgrade to Umbraco 17] Related: package.json, Limbo.Umbraco.TextBox.csproj
// Builds the TypeScript/Lit backoffice client into wwwroot. @umbraco-cms/* imports are kept
// external (resolved at runtime by the backoffice import map). emptyOutDir is disabled so the
// committed wwwroot/umbraco-package.json manifest is preserved across builds.
export default defineConfig({
  base: '/App_Plugins/Limbo.Umbraco.TextBox/',
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'limbo-textbox',
    },
    outDir: 'wwwroot',
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
