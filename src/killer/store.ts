import _ from 'lodash'
import { defineStore, Store } from 'pinia'

interface state {
  digits: number[]
  nextCageId: number
  cage: Store<string, cageState, cageGetters, cageActions>,
  cages: Store<string, cageState, cageGetters, cageActions>[]
}

export const useStore = defineStore('main', {
  state: (): state => ({
    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    cage: newCage(0)(),
    nextCageId: 1,
    cages: []
  }),
  actions: {
    save() {
      this.cages.push(this.cage)
      this.cage = newCage(this.nextCageId)()
      this.nextCageId++
    }
  }
})

interface cageState {
  sum: number
  size: number
  required: number[]
  restricted: number[]
}

interface cageGetters {
  validCombinations(): number[][]
  allCombinations(): number[][]
}

interface cageActions {
  toggleRequired(digit: number): void
  toggleRestricted(digit: number): void
  toggle(collection: number[], digit: number): void
}

export function newCage(id: number) {
  return defineStore(`cage-${id}`, {
    state: (): cageState => ({
      sum: 10,
      size: 2,
      required: [],
      restricted: []
    }),
    actions: {
      toggleRequired(digit: number) {
        this.toggle(this.required, digit)
      },
      toggleRestricted(digit: number) {
        this.toggle(this.restricted, digit)
      },
      toggle(collection: number[], digit: number) {
        if (collection.includes(digit)) {
          _.remove(collection, v => v == digit)
        } else {
          collection.push(digit)
        }
      }
    },
    getters: {
      validCombinations(): number[][] {
        return _.chain(this.allCombinations)
          .filter(c => _.sum(c) == this.sum)
          .filter(c => !_.intersection(c, this.restricted).length)
          .filter(c => !this.required.length || !_.difference(this.required, c).length)
          .value()
      },
      allCombinations(): number[][] {
        let a = [1,2,3,4,5,6,7,8,9]
        let c = this.size

        let index = []
        let n = a.length

        for (let j = 0; j < c; j++)
          index[j] = j
        index[c] = n

        let ok = true
        let result = []

        while (ok) {
          let comb = []
          for (let j = 0; j < c; j++)
            comb[j] = a[index[j]]
          result.push(comb)

          ok = false

          for (let j = c; j > 0; j--) {
            if (index[j - 1] < index[j] - 1) {
              index[j - 1]++
              for (let k = j; k < c; k++)
                index[k] = index[k - 1] + 1
              ok = true
              break
            }
          }
        }

        return result
      }
    }
  })
}
