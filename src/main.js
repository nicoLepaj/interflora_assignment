import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$filters = {
	upperCase(string) {
		return string.toUpperCase();
	},
	/* capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}, */
	removeParentheses(string) {
		return string.replace(/[()]/g, '');
	}
};

app.use(router);
app.mount('#app');
