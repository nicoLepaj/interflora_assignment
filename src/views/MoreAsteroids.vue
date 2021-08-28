<template>
	<div v-if="!use_isLoading" class="cards-container">
		<div class="message">
			<div>
				<div>
					The default list consists of the asteroids that passsed us today and
					yesterday
				</div>
				<div class="message-bottom">
					To select other dates open the calendar and select up to seven days,
					past or future!
				</div>
			</div>
			<button class="button" @click="toggleCalendarModal(true)">
				Open Calendar
			</button>
		</div>
		<AsteroidCard
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
import AsteroidCard from '@/components/AsteroidCard.vue';
import CalendarModal from '@/components/modals/CalendarModal.vue';
import useAsteroids from '@/composables/asteroids';
export default {
	components: {
		AsteroidCard,
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

		const getMoreAsteroids = (datesRange) => {
			toggleCalendarModal(false);
			use_getAsteroids(datesRange);
		};

		const router = useRouter();
		const showDetails = (id) => {
			router.replace({
				name: 'details',
				params: { asteroidId: id }
			});
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
.message {
	margin-top: 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
.cards-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: start;
	max-width: 960px;
}

@media (max-width: 600px) {
	.message {
		flex-direction: column;
	}
	.button {
		margin: 20px 0 12px;
	}
	.message-bottom {
		margin-top: 12px;
	}
}
</style>
