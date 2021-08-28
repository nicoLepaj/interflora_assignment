import { createApp } from 'vue';

import App from './App.vue';

import router from './router';

const app = createApp(App);

app.config.globalProperties.$filters = {
	removeParentheses(string: string) {
		return string.replace(/[()]/g, '');
	}
};

app.use(router);
app.mount('#app');
