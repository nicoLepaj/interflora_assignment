<template>
	<div>
		The default list consists of the asteroids that passsed us today and
		yesterday
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

	<div v-if="!use_isLoading" class="cards-container">
		<AsteroidInfo
			v-for="asteroid in use_asteroids"
			:asteroid="asteroid"
			:key="asteroid.id"
			@click="showDetails(asteroid.id)"
		/>
	</div>



	<CalendarModal
		:modalOpen="calendarModalOpen"
		@close="toggleCalendarModal(false)"
		@confirm="getMoreAsteroids"
	/>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AsteroidInfo from '../components/AsteroidInfo.vue';
import CalendarModal from '../components/modals/CalendarModal.vue';
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

		const calendarModalOpen = ref(false);
		const toggleCalendarModal = (val) => {
			calendarModalOpen.value = val;
		};

		const router = useRouter();
		const showDetails = (id) => {
			router.replace({
          name: "details",
          params: { asteroidId: id }
        });
		};

		const getMoreAsteroids = (datesRange) => {
			toggleCalendarModal(false);
			use_getAsteroids(datesRange);
		};

		return {
			use_asteroids,
			use_isLoading,
			toggleCalendarModal,
			calendarModalOpen,
			getMoreAsteroids,
			showDetails
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
