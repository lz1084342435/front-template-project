/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      screens: {
        ultrawide: '1921px' // 添加大于 1920px 的自定义断点
      }
    }
  },
  plugins: []
}
