<template>
	<TheHeader />
	<div class="main-container">
		<TheNav />
		<router-view />
	</div>
	<TheModal :open="modalOpen" @close="closeModal" />
	<TheSpinner v-if="use_isLoading" />
</template>

<script>
import { ref } from 'vue';
import TheNav from './components/ui/TheNav.vue';
import TheHeader from './components/ui/TheHeader.vue';
import TheSpinner from './components/ui/TheSpinner.vue';
import TheModal from './components/ui/TheModal.vue';
import useAsteroids from './composables/asteroids.js';

export default {
	components: {
		TheHeader,
		TheSpinner,
		TheNav,
		TheModal
	},
	setup() {
		const { getTodayAsteroids: use_getTodayAsteroids, isLoading: use_isLoading } = useAsteroids();

		use_getTodayAsteroids();

		const modalOpen = ref(false);
		setTimeout(() => {
			modalOpen.value = false;
		}, 25000);
		const closeModal = () => (modalOpen.value = false);
		
		return {
			use_isLoading,
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

html {
	background: url('./assets/red-mooon.jpg') no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
body {
	font-family: 'Open Sans', sans-serif;
	margin: 0;
}

.main-container {
	padding: 5%;
	color: #d4d4d4;
}
</style>
