<script setup lang="ts">
import { useStore } from './killer/store.js'
import CageList from './killer/CageList.vue'
import Calculator from './killer/Calculator.vue'

const store = useStore()
</script>

<template>
  <header class="max-w-lg mx-auto">
    <a href="#">
      <h1 class="text-4xl font-bold text-white text-center">Killer</h1>
    </a>
  </header>

  <main class="max-w-[65%] mx-auto grid grid-cols-2 gap-4">

    <Calculator class="bg-white p-8 md:p-12 my-10 rounded-lg shadow-2xl" />

    <CageList class="bg-white p-8 md:p-12 my-10 rounded-lg shadow-2xl" />

  </main>
</template>

<style>

</style>
