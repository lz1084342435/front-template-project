import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const root = process.cwd() // 当前node执行的工作目录
  const env = loadEnv(mode, root) // import.meta.env 是在运行时获取环境变量的值；loadEnv 则是在构建时加载环境变量
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE_DEBUGGER, VITE_PORT, VITE_PROXY, VITE_BUILD_MODE } =
    viteEnv
  return {
    root,
    base: isBuild ? VITE_PUBLIC_PATH : VITE_PUBLIC_PATH, // 开发或生产环境服务的公共基础路径
    plugins: [vue(), vueJsx(), ...createVitePlugins(viteEnv, isBuild)],
    resolve: {
      extensions: ['.vue', '.js', '.ts'], // 配置省略文件后缀
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element/index.scss" as *;'
        }
      },
      devSourcemap: command === 'serve'
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE_DEBUGGER ? ['console.log', 'debugger'] : []
    },
    clearScreen: true, // 默认为true,设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下可以通过 --clearScreen false 设置。
    server: {
      host: '0.0.0.0', // 监听所有地址，包括局域网和公网地址。
      port: VITE_PORT,
      open: false,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      cssTarget: 'chrome52', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target
      assetsInlineLimit: 4096, // 4096 = 4k 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，无论文件大小，资源都会被内联。
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
      chunkSizeWarningLimit: 2000, // 默认500， chunk 大小警告的限制（以 kbs 为单位）。
      reportCompressedSize: VITE_BUILD_MODE === 'development', // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    // 依赖优化选项
    optimizeDeps: {
      include: [] // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    }
  }
}
