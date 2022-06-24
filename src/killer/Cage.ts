import _ from 'lodash'
import { computed, reactive, ref } from 'vue'

export class Cage {
  sum = ref(10)
  size = ref(2)
  required: Number[] = reactive([])
  restricted: Number[] = reactive([])

  toggleRequired(digit: Number) {
    if (this.required.includes(digit)) {
      _.remove(this.required, v => v == digit)
    } else {
      this.required.push(digit)
    }
  }

  toggleRestricted(digit: Number) {
    if (this.restricted.includes(digit)) {
      _.remove(this.restricted, v => v == digit)
    } else {
      this.restricted.push(digit)
    }
  }

  validCombinations = computed(() => {
    return _.chain(this.generateCombinations())
      .filter(c => _.sum(c) == this.sum.value)
      .filter(c => !_.intersection(c, this.restricted).length)
      .filter(c => !this.required.length || !_.difference(this.required, c).length)
      .value()
  })

  generateCombinations() {
    let a = [1,2,3,4,5,6,7,8,9]
    let c = this.size.value

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
