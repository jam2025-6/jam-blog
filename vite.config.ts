import { defineConfig, loadEnv } from "vite";
import type { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // ⬅️ 用 path 更稳
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";
// https://vite.dev/config/
export default defineConfig(({ mode }): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_APP_TITLE } = env;
  return new Promise((resolve) => {
    resolve({
      plugins: [
        vue(),
        svgLoader(),
        createHtmlPlugin({
          minify: true,
          inject: {
            data: {
              //获取标题变量
              title: VITE_APP_TITLE,
            },
          },
        }),
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
          symbolId: "icon-[name]",
        }),
      ],
      resolve: {
        alias: {
          // "@": fileURLToPath(new URL("./src", import.meta.url)),
          "@": path.resolve(__dirname, "./src"), // ⬅️ 不再用 fileURLToPath 写法
        },
        extensions: [".ts", ".ts", ".vue"],
      },
      server: {
        port: 1111,
        open: true,
        host: "0.0.0.0",
        fs: {
          strict: false,
        },
        proxy: {
          "/dev-api": {
            // target: "https://test.ess-ds.com/prod-api/dataaccess",
            target: "http://192.168.28.202:8811",
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/dev-api/, ""),
          },
          "/saas-api": {
            target: "https://test.ess-ds.com/prod-api",
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/saas-api/, ""),
          },
        },
      },
    });
  });
});
