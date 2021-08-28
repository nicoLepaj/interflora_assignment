<template>
	<the-modal :open="modalOpen" :minimal="true">
		<div class="container">
			<DatePicker v-model="range" is-range is-dark color="orange" />
			<div class="confirm-container">
				<div class="full-btn" @click="confirmRange">{{message}}</div>
			</div>
		</div>
	</the-modal>
</template>

<script>
import { ref, watch } from 'vue';

import { DatePicker } from 'v-calendar';
import moment from 'moment';

import TheModal from '@/components/ui/TheModal.vue';

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
	setup(_props, context) {
		const range = ref({
			start: new Date(),
			end: new Date()
		});

    const message = ref('Confirm')
    watch(range, () => {
      message.value = 'Confirm'
    })

		const confirmRange = () => {
			const daysNumber =
				Math.abs(
					moment(range.value.start).diff(moment(range.value.end), 'days')
				) + 1;
			if (daysNumber <= 7) {
				context.emit('confirm', range.value);
			} else {
        message.value = 'Range must be 7 days or less'
      }
		};
		return {
			range,
			confirmRange,
      message
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
