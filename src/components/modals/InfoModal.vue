<template>
	<the-modal :open="modalOpen">
		<!-- <img src="../../assets/planet.svg" />
		<div class="title">Welcome to the Asteroid Tracker</div>
		<div class="sub-title">
			Find out about the latest asteroid to cross our path
		</div>
		<div class="sub-title">
			Or explore more dates in the More Asteroids page
		</div>
		<button class="button" @click="$emit('close')">Got it!</button>
		<div class="extra-info">
			Image made by
			<a
				href="https://www.flaticon.com/authors/smalllikeart"
				title="smalllikeart"
				>smalllikeart</a
			>
			from
			<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
		</div> -->

		<div class="title">
			{{ $filters.upperCase('asteroid') }}
			{{ $filters.removeParentheses(asteroid.name) }}
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`flew by on ${asteroid.flyDate} at ${asteroid.flyTime}`
					)
				}}
			</div>
			<div class="field">
				{{
					$filters.upperCase(
						`passed ${asteroid.missDistance} au away from earth`
					)
				}}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`orbits the ${asteroid.orbit} at ${asteroid.velocity} km/s`
					)
				}}
			</div>
			<div class="field">
				{{
					$filters.upperCase(`is ${asteroid.diameter} meters wide`)
				}}
			</div>
		</div>
		<div class="block">
			<div class="field">
				{{
					$filters.upperCase(
						`is considered ${asteroid.hazardStatus} by nasa`
					)
				}}
			</div>
		</div>
	</the-modal>
</template>

<script>
import TheModal from '../ui/TheModal.vue';
export default {
	components: {
		TheModal
	},
	props: {
		modalOpen: {
			required: true,
			type: Boolean
		},
		asteroid: {
			required: true,
			type: Object
		}
	}
};
</script>

<style scoped>
.title {
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 20px;
}

.sub-title {
	font-size: 1.5rem;
	font-weight: 400;
}
.button {
	padding: 8px 30px;
	font-size: 1.2rem;
	margin-top: 20px;
}
img {
	height: 150px;
}
.extra-info {
  margin-top: 12px;
  font-size: 0.8rem;
  color: #cecece
}
.extra-info a {
  color: inherit;
}
</style>
