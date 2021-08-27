<template>
	<div class="card-info">
		<div class="title">
			{{ $filters.removeParentheses(asteroid.name) }}
		</div>
		<div class="field">
			Flew by on {{moment.unix(asteroid.approachDate).format('MMMM Mo YYYY')}}
		</div>
		<div class="field">
			Is considered {{ asteroid.hazardStatus }}
		</div>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	name: 'AsteroidInfo',
	props: {
		asteroid: {
			type: Object,
			required: true
		}
	},
	setup() {
		return {
			moment
		}
	}
};
</script>

<style scoped>
.card-info {
	margin: 20px 0;
	padding: 15px;
	width: 250px;
	border: 1px solid #707070;
	border-radius: 8px;
	background-color: #a79f8ccc;
	position: relative;
	margin-right: 20px;
	cursor: pointer;
}
.title {
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 8px;
	color: #161616;
}
.field {
	color: #ffffff;
	font-weight: 600;
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
