import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
// prime-vue
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/tailwind-light/theme.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";

createApp(App)
  .use(PrimeVue)
  .use(router)
  .mount('#app')
