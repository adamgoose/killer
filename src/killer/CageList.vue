<script setup lang="ts">
import { useStore } from './store.js'

const store = useStore()

</script>

<template>
  <section>
    <div class="mb-6 py-3 rounded bg-gray-200" v-for="(cage, i) in store.cages" :key="i">
      <span class="block text-gray-700 text-sm font-bold mb-2 ml-3">
        Cage / Sum: {{ cage.sum }} / Size: {{ cage.size }}
      </span>

      <button @click="store.destroyCageAt(i)">
        Delete
      </button>

      <div class="flex flex-row flex-wrap mx-3 gap-3">
        <div class="flex" v-for="(combination, j) in cage.validCombinations" :key="j">
          <div class="aspect-square flex justify-center items-center text-xl w-10 border-r bg-gray-300 hover:bg-gray-400" v-for="(digit, k) in combination" :key="k" :class="{'bg-green-400 hover:bg-green-500': cage.required.includes(digit), 'rounded-l': k == 0}" @click="cage.toggleRequired(digit)">
            <span>{{ digit }}</span>
          </div>
          <div class="aspect-square flex justify-center items-center text-xl w-10 bg-gray-300 hover:bg-red-500 rounded-r">
            <span>x</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
