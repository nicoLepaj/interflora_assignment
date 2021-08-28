<template>
	<div class="selectors">
		<router-link to="/">
			<h1>latest asteroid</h1>
		</router-link>
		<router-link to="/more">
			<h1>more asteroids</h1>
		</router-link>
	</div>
</template>

<style scoped>
.selectors {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	text-transform: uppercase;
}

a {
	text-decoration: none;
	color: #949497;
}

a:last-child {
	margin-left: 30px;
}

a.router-link-active {
  color: inherit;
}

@media (max-width: 600px) {
	.selectors h1 {
		margin-top: 0;
		font-size: 1.2rem;
	}
}
</style>
