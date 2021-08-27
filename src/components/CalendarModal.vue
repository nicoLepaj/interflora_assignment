<template>
	<the-modal :open="modalOpen" :dark="true" :minimal="true">
		<div class="container">
			<DatePicker v-model="range" is-range is-dark color="orange" />
			<div class="confirm-container">
				<div class="full-btn" @click="$emit('confirm', range)">Confirm</div>
			</div>
		</div>
	</the-modal>
</template>

<script>
import { ref } from 'vue';
import TheModal from '../components/ui/TheModal.vue';
import { DatePicker } from 'v-calendar';

export default {
	components: {
		DatePicker,
		TheModal
	},
	props: {
		modalOpen: {
			required: true,
			type: Boolean
		}
	},
	emits: ['confirm'],
	setup() {
		const range = ref({
			start: new Date(),
			end: new Date()
		});
		return {
			range
		};
	}
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
}
.full-btn {
	width: 100%;
	text-align: center;
	padding: 6px;
	cursor: pointer;
	transition: background-color 0.2s;
}
.full-btn:hover {
	background-color: #535353;
}
.confirm-container {
	overflow: hidden;
	border-radius: 0 0 6px 6px;
}
</style>
