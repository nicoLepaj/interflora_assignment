<template>
	<TheHeader />
	<div class="main-container">
		<TheNav v-if="!initialLoading" />
		<router-view />
	</div>
	<WelcomeModal :modalOpen="modalOpen" @close="closeModal" :dark="true" />
	<TheSpinner v-if="use_isLoading" />
</template>

<script>
import { ref, onMounted } from 'vue';
import TheNav from './components/ui/TheNav.vue';
import TheHeader from './components/ui/TheHeader.vue';
import TheSpinner from './components/ui/TheSpinner.vue';
import WelcomeModal from './components/WelcomeModal.vue';
import useAsteroids from './composables/asteroids.js';
import moment from 'moment';

export default {
	components: {
		TheHeader,
		TheSpinner,
		TheNav,
		WelcomeModal
	},
	setup() {
		const {
			getAsteroids: use_getAsteroids,
			isLoading: use_isLoading
		} = useAsteroids();

		const todayRange = { start: moment(), end: moment().add(-1, 'days') };
		const initialLoading = ref(true)
		const modalOpen = ref(false);

		onMounted(async () => {
			await use_getAsteroids(todayRange);
			initialLoading.value = false;

			setTimeout(() => {
			modalOpen.value = true;
		}, 25000);
		});
		
		const closeModal = () => (modalOpen.value = false);

		return {
			use_isLoading,
			initialLoading,
			modalOpen,
			closeModal
		};
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

* {
	box-sizing: border-box;
}

body {
	font-family: 'Open Sans', sans-serif;
	margin: 0;
	background: url('./assets/red-mooon.jpg') no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

.main-container {
	padding: 5%;
	color: #d4d4d4;
}

.button {
	background-color: rgba(221, 221, 221, 0);
	border: 1px solid #cecece;
	color: inherit;
	padding: 5px 10px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 16px;
	transition: background-color 0.2s;
}
.button:hover {
	background-color: #535353;
}
</style>
