<!-- src/App.vue -->
<template>
  <div id="app">
    <CarTracker />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CarTracker from './components/CarTracker.vue';

export default defineComponent({
  name: 'App',
  components: {
    CarTracker
  }
});
</script>

<style>
/* Add global styles if needed */
</style>
