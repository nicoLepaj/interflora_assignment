import { ref, computed } from 'vue';
import axios from 'axios';
import moment from 'moment';

const state = ref({
	isLoading: false,
	objectCount: null,
	asteroids: [],
	latestId: null
});

const useAsteroids = () => {
	const getAsteroids = async (datesRange) => {
		state.value.isLoading = true;
		let asteroids = [];
		const startDate = moment(datesRange.start).format('YYYY-MM-DD');
		const endDate = moment(datesRange.end).format('YYYY-MM-DD');
		try {
			const res = await axios.get(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=fmizeQhZg2e9XjDBaK9jcVuB34DhpZbAwh2qfLWC`
			);

			const nearEarth = res.data.near_earth_objects;
			Object.keys(nearEarth).forEach((key) => {
				asteroids.push(...nearEarth[key]);
			});

			state.value.objectCount = state.value.asteroids.length;
		} catch (error) {
			state.value.isLoading = false;
			throw new Error(error.message);
		}

		formatAsteroids(asteroids);
	};

	const formatAsteroids = (asteroids) => {
		state.value.asteroids = [];
		asteroids.forEach((item) => {
			const timeStamp =
				item.close_approach_data[0].epoch_date_close_approach / 1000;
			const formattedAsteroid = {
				id: item.id,
				name: item.name,
				hazardStatus: item.is_potentially_hazardous_asteroid
					? 'hazardous'
					: 'not hazardous',
				orbit: item.close_approach_data[0].orbiting_body,
				flyDate: moment.unix(timeStamp).format('dddd MMMM Do'),
				flyTime: moment.unix(timeStamp).format('HH:mm'),
				velocity: parseFloat(
					item.close_approach_data[0].relative_velocity.kilometers_per_second
				).toFixed(1),
				diameter: item.estimated_diameter.meters.estimated_diameter_max.toFixed(
					0
				),
				missDistance: parseFloat(
					item.close_approach_data[0].miss_distance.astronomical
				).toFixed(2),
				approachDate: timeStamp
			};

			state.value.asteroids.push(formattedAsteroid);
		});

		if (!state.value.latestId) {
			setLatestAsteroid();
		}
		state.value.isLoading = false;
	};

	const setLatestAsteroid = () => {
		let latestDate = 0;
		let latestAsteroidId;
		const now = moment().unix();
		state.value.asteroids.forEach((item) => {
			if (item.approachDate > latestDate && item.approachDate < now) {
				latestDate = item.approachDate;
				latestAsteroidId = item.id;
			}
		});

		state.value.latestId = latestAsteroidId;
	};

	return {
		getAsteroids,
		objectCount: computed(() => {
			return state.value.objectCount;
		}),
		asteroids: computed(() => {
			return state.value.asteroids;
		}),
		latestAsteroidId: computed(() => {
			return state.value.latestId;
		}),
		isLoading: computed(() => {
			return state.value.isLoading;
		})
	};
};

export default useAsteroids;
