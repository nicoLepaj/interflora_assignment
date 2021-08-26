<template>
	<div class="card-info">
		<div class="title">
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(name) }}
		</div>
		<div class="field">
			Diameter:
			{{ averageDiameter }}
		</div>
		<div class="field">Classified by NASA as {{ hazardStatus }}</div>
		<div class="field">
			Is orbiting around {{ orbit }} at a speed of {{ velocity }} Km/h
		</div>
		<div class="field">Flew by at a distance of {{ missDistance }} AU</div>
	</div>
</template>

<script>
import { computed } from 'vue';
export default {
	name: 'AsteroidInfo',
	props: {
		asteroid: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const name = computed(() => {
			return props.asteroid.name;
		});

		const averageDiameter = computed(() => {
			return (
				(
					(props.asteroid.estimated_diameter.meters.estimated_diameter_max +
						props.asteroid.estimated_diameter.meters.estimated_diameter_min) /
					2
				).toFixed(0) + ' m'
			);
		});

		const hazardStatus = computed(() => {
			return props.asteroid.is_potentially_hazardous_asteroid
				? 'hazardous'
				: 'not hazardous';
		});

		const orbit = computed(() => {
			return props.asteroid.close_approach_data[0].orbiting_body;
		});

		const missDistance = computed(() => {
			const au = +props.asteroid.close_approach_data[0].miss_distance
				.astronomical;
			return au.toFixed(2);
		});

		const velocity = computed(() => {
			let speed = +props.asteroid.close_approach_data[0].relative_velocity
				.kilometers_per_hour;
			speed = speed.toFixed(0);
			return speed;
		});
		return {
			name,
			averageDiameter,
			hazardStatus,
			orbit,
			missDistance,
			velocity
		};
	}
};
</script>

<style scoped>
.card-info {
	margin: 30px 0;
	padding: 15px;
  width: 40%;
  min-width: 300px;
	border: 1px solid #707070;
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 0.11);
}
.title {
	font-size: 1.5rem;
	margin-bottom: 8px;
	color: #ffb184;
}
.field {
	color: #ffecdb;
}

.field:not(:last-child) {
	margin-bottom: 6px;
}
</style>
