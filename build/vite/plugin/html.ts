/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE } = env

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        VITE_APP_TITLE: VITE_GLOB_APP_TITLE
      }
    }
  })
  return htmlPlugin
}
