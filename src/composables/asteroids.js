import { ref, computed } from 'vue';
import axios from 'axios';
import moment from 'moment';

const state = ref({
	isLoading: false,
	objectCount: null,
	asteroids: [],
	latest: null,
	tracked: []
});

const useAsteroids = () => {
	const getTodayAsteroids = async () => {
		state.value.isLoading = true;
		let asteroids = [];
		const today = moment().format('YYYY-MM-DD');
		try {
			const res = await axios.get(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=fmizeQhZg2e9XjDBaK9jcVuB34DhpZbAwh2qfLWC`
			);

			const nearEarth = res.data.near_earth_objects;
			Object.keys(nearEarth).forEach((key) => {
				asteroids.push(...nearEarth[key]);
			});

			state.value.objectCount = state.value.asteroids.length;
		} catch (error) {
			throw new Error(error.message);
		}

		formatAsteroids(asteroids);
	};

	const formatAsteroids = (asteroids) => {
		asteroids.forEach((item) => {
			const timeStamp =
				item.close_approach_data[0].epoch_date_close_approach / 1000;
			const formattedAsteroid = {
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
				diameter: item.estimated_diameter.meters.estimated_diameter_max.toFixed(0),
				missDistance: parseFloat(item.close_approach_data[0].miss_distance.astronomical).toFixed(2),
				approachDate: timeStamp
			};
			state.value.asteroids.push(formattedAsteroid)
		});
		setLatestAsteroid();
	};

	const setLatestAsteroid = () => {
		let latestDate = 0;
		let latestAsteroid;
		const now = moment().unix();
		state.value.asteroids.forEach((item) => {
			if (item.approachDate > latestDate && item.approachDate < now) {
				latestDate = item.approachDate;
				latestAsteroid = item;
			}
		});

		state.value.latest = latestAsteroid;
		state.value.isLoading = false;
	};

	return {
		getTodayAsteroids,
		objectCount: computed(() => {
			return state.value.objectCount;
		}),
		asteroids: computed(() => {
			return state.value.asteroids;
		}),
		latestAsteroid: computed(() => {
			return state.value.latest;
		}),
		isLoading: computed(() => {
			return state.value.isLoading;
		})
	};
};

export default useAsteroids;
