/*
 * @Description: 用于生成 svg 雪碧图，项目运行时就生成所有图标
 */
import type { PluginOption } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgSpritePlugin(isBuild: boolean): PluginOption | PluginOption[] {
  const svgIconsPlugin = createSvgIconsPlugin({
    // 资源目录
    iconDirs: [
      path.resolve(process.cwd(), 'src/icons/common'),
      path.resolve(process.cwd(), 'src/icons/nav-bar')
    ],
    // 压缩配置
    svgoOptions: isBuild,
    // 唯一id
    symbolId: 'icon-[dir]-[name]',
    // svgDom插入位置
    inject: 'body-last'
  })
  return svgIconsPlugin
}
