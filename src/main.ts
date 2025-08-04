import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import './mock'
import '@/router/guard'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pina = createPinia();
app.use(ElementPlus);
app.use(pina);
app.use(router);
app.mount('#app')
