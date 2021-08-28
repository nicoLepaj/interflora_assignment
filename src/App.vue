<template>
	<div id="background">
		<img src="@/assets/blood-moon.png" alt="moon-background" />
	</div>
	<div id="stars-container">
		<div id="stars" />
		<div id="stars2" />
		<div id="stars3" />
	</div>
	<div class="main-container">
		<TheHeader v-if="!initialLoading" />
		<router-view />
	</div>
	<WelcomeModal :modalOpen="modalOpen" @close="closeModal" />
	<TheSpinner v-if="use_isLoading" />
</template>

<script>
import { ref, onMounted } from 'vue';
import TheHeader from '@/components/ui/TheHeader.vue';
import TheSpinner from '@/components/ui/TheSpinner.vue';
import WelcomeModal from '@/components/modals/WelcomeModal.vue';
import useAsteroids from '@/composables/asteroids.js';
import moment from 'moment';

export default {
	components: {
		TheHeader,
		TheSpinner,
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
				modalOpen.value = false;
			}, 25000);
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
@import './components/ui/stars/Stars.css';
* {
	box-sizing: border-box;
}

body {
	font-family: 'Open Sans', sans-serif;
	margin: 0;
	background: #000;
}
#background img {
	position: fixed;
	top: 170px;
	right: 100px;
	width: 450px;
	height: auto;
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
