<template>
	<div v-if="!use_isLoading" class="container">
		<h1>
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(use_latestAsteroid.name) }}
		</h1>
		<h2>
			{{ $filters.upperCase(`flew by on ${flyTime.date} at ${flyTime.time}`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`passed ${missDistance} au away from earth`) }}
		</h2>
		<h2>
			{{ $filters.upperCase(`nasa classified this object as ${hazardStatus}`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`orbits the ${orbit} at ${velocity} km/s`) }}
		</h2>
    <h2>
			{{ $filters.upperCase(`has a diameter of ${averageDiameter}`) }}
		</h2>
	</div>
</template>

<script>
import { computed } from 'vue';
import useAsteroids from '../composables/asteroids.js';
import moment from 'moment';
export default {
	setup() {
		const {
			getTodayAsteroids: use_getTodayAsteroids,
			latestAsteroid: use_latestAsteroid,
			isLoading: use_isLoading
		} = useAsteroids();

		use_getTodayAsteroids();

		const hazardStatus = computed(() => {
			return use_latestAsteroid.value.is_potentially_hazardous_asteroid
				? 'hazardous'
				: 'not hazardous';
		});

    const orbit = computed(() => {
			return use_latestAsteroid.value.close_approach_data[0].orbiting_body;
		});

		const flyTime = computed(() => {
			const timeStamp =
				use_latestAsteroid.value.close_approach_data[0]
					.epoch_date_close_approach;
			return {
				date: moment.unix(timeStamp / 1000).format('dddd MMMM Do'),
				time: moment.unix(timeStamp / 1000).format('HH:mm')
			};
		});

    const velocity = computed(() => {
			let speed = +use_latestAsteroid.value.close_approach_data[0].relative_velocity
				.kilometers_per_second;
			speed = speed.toFixed(1);
			return speed;
		});

    const averageDiameter = computed(() => {
			return (
				(
					(use_latestAsteroid.value.estimated_diameter.meters.estimated_diameter_max +
						use_latestAsteroid.value.estimated_diameter.meters.estimated_diameter_min) /
					2
				).toFixed(0) + ' m'
			);
		});

    const missDistance = computed(() => {
			const au = +use_latestAsteroid.value.close_approach_data[0].miss_distance
				.astronomical;
			return au.toFixed(2);
		});

		return {
			use_latestAsteroid,
			use_isLoading,
			flyTime,
			hazardStatus,
      orbit,
      velocity,
      averageDiameter,
      missDistance
		};
	}
};
</script>

<style></style>
