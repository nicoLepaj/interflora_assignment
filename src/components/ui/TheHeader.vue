<template>
	<header>
    <TheNav/>
  </header>
</template>

<script>
import TheNav from '@/components/ui/TheNav.vue'
export default {
  components: {
    TheNav
  }
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #000000;  
}
</style>
