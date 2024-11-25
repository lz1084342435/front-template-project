export {} // 确保这是一个模块

declare global {
  declare interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_DROP_CONSOLE_DEBUGGER: boolean
    VITE_PROXY: [string, string][]
    VITE_GLOBAL_PREFIX?: string,
    VITE_GLOB_APP_TITLE: string
    VITE_DROP_CONSOLE: boolean
    VITE_LEGACY: boolean
    VITE_ANALYSIS: boolean
    VITE_COMPRESS: boolean
    VITE_BUILD_MODE: 'development' | 'production'
    VITE_USE_MOCK: boolean
  }
  declare type Recordable<T = any> = Record<string, T>;
  interface ObjKeys {
    [propName: string]: any
  }
}
