import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
// 样式全局使用
import 'vant/lib/index.css'
import '@/styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
