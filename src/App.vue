<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import appHeader from './components/app-header.vue';
import { useItemStore } from './store/itemStore';
useItemStore();
</script>

<template>
  <appHeader />

  
  <RouterView />
</template>

<style scoped>

</style>
