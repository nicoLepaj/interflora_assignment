<template>
	<transition name="backdrop">
		<div v-if="open" class="backdrop" @click="$emit('close')"></div>
	</transition>
	<transition name="slide-down">
		<dialog
			:class="[
				'modal',
				minimal ? 'minimal' : 'classic',
				dark ? 'dark' : 'light'
			]"
			open
			v-if="open"
		>
			<slot></slot>
		</dialog>
	</transition>
</template>

<script>
export default {
	props: {
		open: {
			required: true,
			type: Boolean
		},
		minimal: {
			required: false,
			type: Boolean,
			default: false
		},
		dark: {
			required: false,
			type: Boolean,
			default: false
		}
	},
	emits: ['close']
};
</script>

<style scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.75);
}

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	z-index: 100;
	border: none;
}

.classic {
	width: 40rem;
	text-align: center;
	padding: 1rem;
	border-radius: 12px;
}
.minimal {
	padding: 0;
	border-radius: 6px;
}

.light {
	background-color: #ffffff;
}

.dark {
	background-color: #3f3f3f;
	color: #ffffff;
}

@keyframes slide-down {
	from {
		opacity: 0;
		transform: translate(-50%, calc(-50% - 50px)) scale(0.9);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
}
.slide-down-enter-active {
	animation: slide-down 0.2s ease-out;
}
.slide-down-leave-active {
	animation: slide-down 0.2s ease-in reverse;
}

@keyframes opacify {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.backdrop-enter-active {
	animation: opacify 0.2s ease-out;
}
.backdrop-leave-active {
	animation: opacify 0.2s ease-in reverse;
}

@media (max-width: 600px) {
	.classic {
		width: 90%;
	}
}
</style>
