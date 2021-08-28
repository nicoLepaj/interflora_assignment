<template>
	<div v-if="!use_isLoading">
		<SingleAsteroid/>
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
			isLoading: use_isLoading
		} = useAsteroids();

		return {
			use_isLoading
		};
	}
};
</script>
