/*
 * @Description: 按需元件自动导入
 */
import type { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function configComponentsPlugin(): PluginOption | PluginOption[] {
  const plugin = Components({
    // 指定组件位置，默认是src/components
    dirs: ['src/components'],
    // ui库解析器，也可以自定义
    resolvers: [ElementPlusResolver()],
    extensions: ['vue']
  })
  return plugin
}
