import { ref, computed } from 'vue';

import axios from 'axios';
import moment from 'moment';

import Asteroid from '@/interfaces/Asteroid';

const state = ref<{
	isLoading: boolean;
	asteroids: Asteroid[];
	latest: Asteroid;
}>({
	isLoading: false,
	asteroids: [],
	latest: {} as Asteroid
});

const useAsteroids = () => {
	const getAsteroids = async (datesRange: {
		start: moment.Moment;
		end: moment.Moment;
	}) => {
		state.value.isLoading = true;
		state.value.asteroids = [];
		const asteroids: any[] = [];
		const startDate = moment(datesRange.start).format('YYYY-MM-DD');
		const endDate = moment(datesRange.end).format('YYYY-MM-DD');
		const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

		try {
			const res = await axios.get(
				`${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.VUE_APP_API_KEY}`
			);

			const nearEarth = res.data.near_earth_objects;
			Object.keys(nearEarth).forEach((key) => {
				asteroids.push(...nearEarth[key]);
			});
		} catch (error) {
			state.value.isLoading = false;
			throw new Error(error.message);
		}

		formatAsteroids(asteroids);
	};

	const formatAsteroids = (asteroids: any[]) => {
		asteroids.forEach((item) => {
			const timeStamp =
				item.close_approach_data[0].epoch_date_close_approach / 1000;
			const formattedAsteroid: Asteroid = {
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

		if (Object.keys(state.value.latest).length === 0) {
			setLatestAsteroid();
		}
		state.value.isLoading = false;
	};

	const setLatestAsteroid = () => {
		let latestDate = 0;
		let latestAsteroid: Asteroid | undefined;
		const now = moment().unix();
		state.value.asteroids.forEach((item) => {
			if (item.approachDate > latestDate && item.approachDate < now) {
				latestDate = item.approachDate;
				latestAsteroid = item;
			}
		});

		if (latestAsteroid) {
			state.value.latest = latestAsteroid;
		}
	};

	return {
		getAsteroids,
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
