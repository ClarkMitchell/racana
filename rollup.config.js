import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import fs from "fs";
import path from "path";

const base = "./src/components";
const componentDirectories = fs.readdirSync(base);
const componentFiles = Object.fromEntries(
  componentDirectories.map((componentDir) => [
    componentDir,
    path.join(__dirname, base, componentDir, "index.ts"),
  ])
);

export default {
  input: {
    index: "src/index.ts",
    ...componentFiles,
  },
  output: [
    {
      dir: "lib",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: [".css"],
    }),
  ],
};
