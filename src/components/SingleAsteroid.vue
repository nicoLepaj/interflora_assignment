<template>
	<div class="container">
		<div class="title">
			asteroid
			{{ $filters.removeParentheses(asteroid.name) }}
		</div>
		<div class="block">
			<div class="field">
				{{ `flew by on ${asteroid.flyDate} at ${asteroid.flyTime}` }}
			</div>
			<div class="field">
				{{ `passed ${asteroid.missDistance} au away from earth` }}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{ `orbits the ${asteroid.orbit} at ${asteroid.velocity} km/s` }}
			</div>
			<div class="field">
				{{ `is ${asteroid.diameter} meters wide` }}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{ `is considered ${asteroid.hazardStatus} by nasa` }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import useAsteroids from '@/composables/asteroids';

import Asteroid from '@/interfaces/Asteroid';

export default defineComponent({
	props: {
		asteroidId: {
			required: false,
			type: String
		}
	},
	setup(props) {
		const {
			asteroids: use_asteroids,
			latestAsteroid: use_latestAsteroid
		} = useAsteroids();

		const asteroid = ref<Asteroid>();

		if (!props.asteroidId) {
			asteroid.value = use_latestAsteroid.value;
		} else {
			asteroid.value = use_asteroids.value.find(
				(item) => item.id === props.asteroidId
			);
		}

		return {
			asteroid
		};
	}
});
</script>

<style scoped>
.container {
	margin-top: 80px;
	text-transform: uppercase;
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

@media (max-width: 600px) {
	.container {
		margin-top: 30px;
	}

	.title {
		font-size: 1.5rem;
	}
	.field {
		font-size: 1rem;
	}
}
</style>
