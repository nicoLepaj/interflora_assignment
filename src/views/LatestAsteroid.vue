<template>
	<div v-if="!use_isLoading" class="container">
		<div class="title">
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(use_latestAsteroid.name) }}
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`flew by on ${use_latestAsteroid.flyDate} at ${use_latestAsteroid.flyTime}`
					)
				}}
			</div>
			<div class="field">
				{{
					$filters.upperCase(
						`passed ${use_latestAsteroid.missDistance} au away from earth`
					)
				}}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`orbits the ${use_latestAsteroid.orbit} at ${use_latestAsteroid.velocity} km/s`
					)
				}}
			</div>
			<div class="field">
				{{
					$filters.upperCase(`is ${use_latestAsteroid.diameter} meters wide`)
				}}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`is considered ${use_latestAsteroid.hazardStatus} by nasa`
					)
				}}
			</div>
		</div>
	</div>
</template>

<script>
import useAsteroids from '../composables/asteroids.js';
export default {
	setup() {
		const {
			latestAsteroid: use_latestAsteroid,
			isLoading: use_isLoading
		} = useAsteroids();

		return {
			use_latestAsteroid,
			use_isLoading
		};
	}
};
</script>

<style scoped>
.container {
	margin-top: 80px;
}
.block {
	margin-top: 20px;
}
.title {
	color: #ffb082;
	font-size: 2rem;
	font-weight: 700;
}
.field {
	font-size: 1.3rem;
	font-weight: 600;
}
</style>
