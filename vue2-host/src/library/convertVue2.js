import { createApp } from 'vue3';

export default function convertVue2(component, selector) {
    const app = createApp(component);
    app.mount(selector);
}