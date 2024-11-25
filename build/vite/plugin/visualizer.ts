// 打包依赖分析

import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'

export function configVisualizerPlugin(): PluginOption | PluginOption[] {
  const plugin = visualizer({
    // 是否生成文件
    emitFile: false,
    // 分析图生成的文件名
    filename: 'analysis-chart.html',
    // 如果存在本地服务端口，将在打包后自动展示
    open: true
  })
  return plugin
}
