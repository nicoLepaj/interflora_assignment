<template>
	<div class="container">
			<h1 class="title">{{ $filters.upperCase('flybys today') }}</h1>
			<AsteroidInfo
				v-for="asteroid in use_asteroids"
				:asteroid="asteroid"
				:key="asteroid.id"
			/>

	</div>
</template>

<script>
import { onMounted } from 'vue';
import AsteroidInfo from '../components/AsteroidInfo.vue';
import useAsteroids from '@/composables/asteroids';
export default {
	name: 'Home',
	components: {
		AsteroidInfo
	},
	setup() {
		const {
			getTodayAsteroids: use_getTodayAsteroids,
			objectCount: use_objectCount,
			asteroids: use_asteroids 
			//isLoading: use_isLoading
		} = useAsteroids();

		onMounted(async () => {
			await use_getTodayAsteroids();
			console.log('use_objectCount', use_objectCount.value)
			console.log('asteroids', use_asteroids.value)
		});

		return {
			use_asteroids
		};
	}
};
</script>

<style scoped>
.container {
	padding: 5% 10%;
	color: #d4d4d4;
}

.title {
	position: sticky;
  top: 20px;
	background-color: black;
}
</style>
