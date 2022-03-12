import { createApp } from 'vue';
import App from './App';
import store from "@/store";
import router from "@/router/router";
import components from '@/components/UI'

const app = createApp(App);

components.forEach((component) => {
    app.component(component.name, component)
})

app
    .use(store)
    .use(router)
    .mount('#app')
