/*
 * @Description: 组件自动导入
 */
import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function configAutomImportPlugin(): PluginOption | PluginOption[] {
  const plugin = AutoImport({
    dts: 'types/auto-imports.d.ts', // 这里是生成的global函数文件
    imports: ['vue', 'vue-router', 'pinia'], // 需要自动导入的插件
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    // 解决eslint报错问题
    eslintrc: {
      // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
      enabled: false,
      filepath: '../../../.eslintrc-auto-import.json', // 生成的文件路径
      globalsPropValue: true
    },
    resolvers: [ElementPlusResolver()]
  })
  return plugin
}
