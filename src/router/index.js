import { createRouter, createWebHistory } from 'vue-router';
import LatestAsteroid from '../views/LatestAsteroid.vue';
import MoreAsteroids from '../views/MoreAsteroids.vue';
import SingleAsteroid from '../components/SingleAsteroid.vue';

const routes = [
	{
		path: '/',
		name: 'latest',
		component: LatestAsteroid
	},
	{
		path: '/more',
		name: 'more',
		component: MoreAsteroids
	},
  {
    path: "/details/:asteroidId",
    name: "details",
    component: SingleAsteroid,
    props: true
  }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
