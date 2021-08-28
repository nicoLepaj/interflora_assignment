<template>
	<div class="main-container">
		<TheHeader v-if="!initialLoading" />
		<router-view />
	</div>
	<WelcomeModal :modalOpen="modalOpen" @close="closeModal" />
	<TheSpinner v-if="use_isLoading" />
	<div id="background">
		<img src="@/assets/blood-moon.png" alt="moon-background" />
	</div>
	<Stars />
</template>

<script>
import { ref, onMounted } from 'vue';

import moment from 'moment';

import TheHeader from '@/components/ui/TheHeader.vue';
import TheSpinner from '@/components/ui/TheSpinner.vue';
import Stars from '@/components/ui/Stars.vue';
import WelcomeModal from '@/components/modals/WelcomeModal.vue';
import useAsteroids from '@/composables/asteroids.js';

export default {
	components: {
		TheHeader,
		TheSpinner,
		Stars,
		WelcomeModal
	},
	setup() {
		const {
			getAsteroids: use_getAsteroids,
			isLoading: use_isLoading
		} = useAsteroids();

		const todayRange = { start: moment(), end: moment().add(-1, 'days') };
		const modalOpen = ref(false);
		const initialLoading = ref(true);

		onMounted(async () => {
			await use_getAsteroids(todayRange);
			initialLoading.value = false;
			setTimeout(() => {
				modalOpen.value = true;
			}, 250);
		});

		const closeModal = () => (modalOpen.value = false);

		return {
			use_isLoading,
			modalOpen,
			closeModal,
			initialLoading
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
	background: #151a22;
}
#background img {
	position: fixed;
	top: 170px;
	right: 100px;
	width: 450px;
	height: auto;
	z-index: -1;
}
.main-container {
	padding: 5%;
	color: #fff;
}

.button {
	background-color: #f3d23f;
	border: none;
	color: #36393f;
	padding: 8px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
	border-radius: 20px;
	transition: all 0.2s;
	font-weight: 700;
	font-size: 1.02rem;
}
.button:hover {
	transform: scale(1.05);
}

@media (max-width: 600px) {
	#background img {
		top: 400px;
		right: -50px;
		width: 200px;
	}
}
</style>
