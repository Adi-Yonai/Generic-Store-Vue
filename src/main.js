import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import {useItemStore} from './store/itemStore'

export default {
    setup() {
      const store = useStore()
  
      return {
        store,
      }
    },
  }

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
