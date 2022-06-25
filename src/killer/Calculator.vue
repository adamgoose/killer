<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref, computed } from 'vue'
import { useStore } from './store.js'

const store = useStore()
const digits = store.digits
</script>

<template>
  <section>
    <div class="grid grid-cols-2 gap-4">
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="sum">Cage Total</label>
        <input type="number" id="sum" v-model="store.cage.sum" min="1" max="45" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div>

      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="cells">Cage Size</label>
        <input type="number" id="cells" v-model="store.cage.size" min="1" max="9" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div>
    </div>

    <div class="mb-6 pt-3 pb-4 rounded bg-gray-200">
      <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="sum">Required Digits</label>
      <div class="grid grid-cols-9 gap-4 mx-4">
        <button class="aspect-square rounded bg-gray-300 hover:bg-gray-400" v-for="digit in digits" :key="digit" :class="{'bg-green-400 hover:bg-green-500': store.cage.required.includes(digit)}" @click="store.cage.toggleRequired(digit)">{{ digit }}</button>
      </div>
    </div>

    <div class="mb-6 pt-3 pb-4 rounded bg-gray-200">
      <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="sum">Restricted Digits</label>
      <div class="grid grid-cols-9 gap-4 mx-4">
        <button class="aspect-square rounded bg-gray-300 hover:bg-gray-400" v-for="digit in digits" :key="digit" :class="{'bg-red-400 hover:bg-red-500': store.cage.restricted.includes(digit)}" @click="store.cage.toggleRestricted(digit)">{{ digit }}</button>
      </div>
    </div>

    <div class="mb-6 grid grid-cols-9" v-for="(combination, i) in store.cage.validCombinations" :key="i">
      <div class="aspect-square bg-gray-100 flex justify-center items-center text-xl" v-for="(digit, j) in combination" :key="j" :class="{'rounded-l': j == 0, 'rounded-r': j == combination.length - 1, 'border-r': j != combination.length - 1}">
        <span>{{ digit }}</span>
      </div>
    </div>

    <button @click="store.save">Save</button>
  </section>
</template>

<style scoped>

</style>
