<template>
	<div class="selectors">
		<router-link to="/">
			<h1>{{ $filters.upperCase('latest asteroid') }}</h1>
		</router-link>
		<router-link to="/more">
			<h1>{{ $filters.upperCase('more asteroids') }}</h1>
		</router-link>
	</div>
</template>

<style scoped>
.selectors {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	position: sticky;
	top: 20px;
	background-color: black;
	z-index: 10;
}

a {
	text-decoration: none;
	color: #999999;
}

a:last-child {
	margin-left: 30px;
}

a.router-link-active {
  color: inherit;
}

@media (max-width: 600px) {
	.selectors {
		top: 6px;
	}
	.selectors h1 {
		margin-top: 0;
	}
}
</style>
