<template>
	<div class="card-info">
		<div class="title">
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(asteroid.name) }}
		</div>
		<div class="field">
			Diameter:
			{{ asteroid.diameter }}
		</div>
		<div class="field">Classified by NASA as {{ asteroid.hazardStatus }}</div>
		<div class="field">
			Is orbiting around {{ asteroid.orbit }} at a speed of {{ asteroid.velocity }} Km/h
		</div>
		<div class="field">Flew by at a distance of {{ asteroid.missDistance }} AU</div>
	</div>
</template>

<script>
export default {
	name: 'AsteroidInfo',
	props: {
		asteroid: {
			type: Object,
			required: true
		}
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
	position: relative;
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
.fav-button {
	position: absolute;
	bottom: 0;
	right: 0;
}
</style>
