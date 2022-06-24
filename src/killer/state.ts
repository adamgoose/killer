import { reactive } from 'vue'
import { Cage } from './Cage.js'

export const store = reactive({
  digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  cage: new Cage(),
  newCage() {
    this.cage = new Cage()
  },
  cages: []
})
