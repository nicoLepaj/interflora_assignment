<template>
	<div v-if="!use_isLoading" class="container">
		<h1>
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(use_latestAsteroid.name) }}
		</h1>
		<h2>
			{{ $filters.upperCase(`flew by on ${use_latestAsteroid.flyDate} at ${use_latestAsteroid.flyTime}`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`passed ${use_latestAsteroid.missDistance} au away from earth`) }}
		</h2>
		<h2>
			{{ $filters.upperCase(`nasa classified this object as ${use_latestAsteroid.hazardStatus}`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`orbits the ${use_latestAsteroid.orbit} at ${use_latestAsteroid.velocity} km/s`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`has a diameter of ${use_latestAsteroid.diameter}`) }}
		</h2>
	</div>
</template>

<script>
import useAsteroids from '../composables/asteroids.js';
export default {
	setup() {
		const {
			getTodayAsteroids: use_getTodayAsteroids,
			latestAsteroid: use_latestAsteroid,
			isLoading: use_isLoading
		} = useAsteroids();

		use_getTodayAsteroids();

		return {
			use_latestAsteroid,
			use_isLoading
		};
	}
};
</script>

<style></style>
