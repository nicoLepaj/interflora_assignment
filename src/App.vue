<template>
	<TheHeader />
	<router-view />
</template>

<script>
import TheHeader from './components/TheHeader.vue';
export default {
	components: {
		TheHeader
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

* {
	box-sizing: border-box;
}

html {
	background: url('./assets/red-mooon.jpg') no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
body {
	font-family: 'Open Sans', sans-serif;
  margin: 0;
}
</style>
