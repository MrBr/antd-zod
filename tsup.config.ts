import { defineConfig } from "tsup"

export default defineConfig(async () => {
  return [
    {
      entry: ["./src/index.ts"],
      sourcemap: false,
      clean: true,
      bundle: true,
      treeshake: false,
    },
  ];
});