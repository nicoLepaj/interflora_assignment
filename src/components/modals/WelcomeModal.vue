<template>
	<the-modal :open="modalOpen">
		<img src="@/assets/satellite.png" />
		<div class="title">Welcome to the Asteroid Tracker</div>
		<div class="sub-title">
			Find out about the latest asteroid to cross our path
		</div>
		<div class="sub-title">
			Or explore more dates in the More Asteroids page
		</div>
		<button class="button" @click="$emit('close')">Got it!</button>
	</the-modal>
</template>

<script>
import TheModal from '@/components/ui/TheModal.vue';
export default {
	components: {
		TheModal
	},
	props: {
		modalOpen: {
			required: true,
			type: Boolean
		}
	}
};
</script>

<style scoped>
.title {
	font-size: 1.8rem;
	font-weight: 600;
	margin: 20px 0;
}

.sub-title {
	font-size: 1.2rem;
	color: #b8b6c0;
}

img {
	height: 110px;
}

.button {
	margin-top: 30px;
	width: 150px;
}

@media (max-width: 600px) {
	.sub-title {
		font-size: 1.5rem;
	}
}
</style>
