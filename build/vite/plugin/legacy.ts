// vite兼容低版本浏览器

import type { PluginOption } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export function configLegacyPlugin(): PluginOption | PluginOption[] {
  const plugin = legacy({
    targets: ['defaults', 'ie >= 11', 'chrome 52'], // 需要兼容的目标列表，可以设置多个
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    modernPolyfills: true
  })
  return plugin
}
