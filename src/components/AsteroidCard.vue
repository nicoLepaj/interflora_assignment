<template>
	<div class="card">
		<div class="title">
			{{ $filters.removeParentheses(asteroid.name) }}
		</div>
		<div class="field">Flew by on {{ formattedDate }}</div>
		<div class="field">Is considered {{ asteroid.hazardStatus }}</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import moment from 'moment';

import Asteroid from '@/interfaces/Asteroid'

export default defineComponent({
	props: {
		asteroid: {
			type: Object as PropType<Asteroid>,
			required: true
		}
	},
	setup(props) {
		const formattedDate = computed(() => {
			return moment.unix(props.asteroid.approachDate).format('MMMM Do YYYY');
		});
		return {
			formattedDate
		};
	}
});
</script>

<style scoped>
.card {
	margin: 20px 0;
	padding: 15px;
	width: 300px;
	border-radius: 8px;
	background-color: #1B202A;
	position: relative;
	margin-right: 20px;
	cursor: pointer;
	box-shadow: 0px 11px 9px -8px #0f0f0f;
}
.title {
	font-size: 1.2rem;
	font-weight: 700;
	margin-bottom: 8px;
}
.field {
	font-size: 0.9rem;
	color: #b8b6c0;
}
.field:not(:last-child) {
	margin-bottom: 6px;
}
.fav-button {
	position: absolute;
	bottom: 0;
	right: 0;
}

@media (max-width: 600px) {
	.card {
		width: 100%;
		margin: 10px 0;
	}
	.card:first-child {
		margin-top: 20px;
	}
}
</style>
