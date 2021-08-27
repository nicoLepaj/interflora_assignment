<template>
	<the-modal :open="modalOpen" :dark="true" :minimal="true">
			<DatePicker v-model="range" is-range is-dark color="orange" />
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
	flex-direction: row;
  justify-content: space-between
}
.calendar-message {
  margin-left: 12px;
}
</style>
