<template>
	<div v-if="!use_isLoading">
		<SingleAsteroid :asteroidId="use_latestAsteroidId"/>
	</div>
</template>

<script>
import SingleAsteroid from '../components/SingleAsteroid.vue'
import useAsteroids from '../composables/asteroids.js';
export default {
	components: {
		SingleAsteroid
	},
	setup() {
		const {
			latestAsteroidId: use_latestAsteroidId,
			isLoading: use_isLoading
		} = useAsteroids();

		return {
			use_latestAsteroidId,
			use_isLoading
		};
	}
};
</script>
