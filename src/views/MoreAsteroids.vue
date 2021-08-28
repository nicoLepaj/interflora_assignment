<template>
	<div>
		The default list consists of the asteroids that passsed us today and yesterday
	</div>
	<div>
		To select other dates
		<span
			><button class="button" @click="toggleCalendarModal(true)">
				Open The Calendar
			</button></span
		>
		and select up to seven days, past or future!
	</div>
	<CalendarModal
		:modalOpen="modalOpen"
		@close="toggleCalendarModal(false)"
		@confirm="getMoreAsteroids"
	/>
	<div v-if="!use_isLoading" class="cards-container">
		<AsteroidInfo
			v-for="asteroid in use_asteroids"
			:asteroid="asteroid"
			:key="asteroid.id"
		/>
	</div>
</template>

<script>
import { ref } from 'vue';
import AsteroidInfo from '../components/AsteroidInfo.vue';
import CalendarModal from '../components/CalendarModal.vue';
import useAsteroids from '@/composables/asteroids';
export default {
	name: 'Home',
	components: {
		AsteroidInfo,
		CalendarModal
	},
	setup() {
		const {
			getAsteroids: use_getAsteroids,
			asteroids: use_asteroids,
			isLoading: use_isLoading
		} = useAsteroids();

		const modalOpen = ref(false);
		const toggleCalendarModal = (val) => {
			modalOpen.value = val;
		};

		const getMoreAsteroids = (datesRange) => {
			toggleCalendarModal(false);
			use_getAsteroids(datesRange);
		};

		return {
			use_asteroids,
			use_isLoading,
			toggleCalendarModal,
			modalOpen,
			getMoreAsteroids
		};
	}
};
</script>

<style scoped>
.cards-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: start;
	max-width: 825px;
}
</style>
