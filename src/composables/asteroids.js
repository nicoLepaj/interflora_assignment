import { ref, computed } from 'vue';
import axios from 'axios';
import moment from 'moment'

const state = ref({
	isLoading: false,
	objectCount: null,
	asteroids: [],
	tracked: []
});

const useAsteroids = () => {
	const getTodayAsteroids = async () => {
		state.value.isLoading = true;
		const today = moment().format('YYYY-MM-DD')
		try {
			const res = await axios.get(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=fmizeQhZg2e9XjDBaK9jcVuB34DhpZbAwh2qfLWC`
				
			);

			const nearEarth = res.data.near_earth_objects;
			Object.keys(nearEarth).forEach((key) => {
				state.value.asteroids.push(...nearEarth[key]);
			});

			state.value.objectCount = state.value.asteroids.length;
		} catch (error) {
			throw new Error(error.message);
		}
		state.value.isLoading = false;
		console.log('state',state.value.asteroids)
	};

	return {
		getTodayAsteroids,
		objectCount: computed(() => {
			return state.value.objectCount;
		}),
		asteroids: computed(() => {
			return state.value.asteroids;
		}),

		isLoading: computed(() => {
			return state.value.isLoading;
		})
	};
};

export default useAsteroids;
