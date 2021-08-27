<template>
	<div v-if="!use_isLoading">
		<AsteroidInfo
			v-for="asteroid in use_asteroids"
			:asteroid="asteroid"
			:key="asteroid.id"
		/>
	</div>
</template>

<script>
//import { onMounted } from 'vue';
import AsteroidInfo from '../components/AsteroidInfo.vue';
import useAsteroids from '@/composables/asteroids';
export default {
	name: 'Home',
	components: {
		AsteroidInfo
	},
	setup() {
		const {
			//getTodayAsteroids: use_getTodayAsteroids,
			//objectCount: use_objectCount,
			asteroids: use_asteroids,
			isLoading: use_isLoading
		} = useAsteroids();

		return {
			use_asteroids,
			//use_objectCount,
			use_isLoading
		};
	}
};
</script>
