/*
 * @Description: 启用mockjs模拟接口数据
 */
import type { PluginOption } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean): PluginOption | PluginOption[] {
  console.log('!isBuild==', !isBuild)

  const plugin = viteMockServe({
    mockPath: 'mock',
    // eslint-disable-next-line no-useless-escape
    ignore: /^\_/,
    // 打包开关
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    // 是否在控制台打印日志
    logger: false,
    // 是否监视mockPath对应的文件夹内文件中的更改
    watchFiles: true,
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';
       setupProdMockServer();
       `
  })
  return plugin
}
