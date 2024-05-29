import { defineStore } from 'pinia'

export const useCarsStore = defineStore('carsStore', {
  state: () => ({
    cars: [],
    brands: [],
    statuses: [],
    trucksCount: null,
    code: '',
    description: '',
  }),

  actions: {
    getTrucks(params) {
      fetchTrucks(params)
        .then(res => this.cars = res.data.value)
        .catch(err => console.log(err))
    },

    /*
       Call to utils/api.js fetchBands() function to perform request on GET /brands endpoint.
       Left commented out for possible future backend enhancement
    */

    // getBrands() {
    //   fetchBrands()
    //     .then(res => this.brands = res.data.value)
    //     .catch(err => console.log(err))
    //    },

    getBrands() {
      this.brands = brandsArr
    },

    /*
       Call to utils/api.js fetchBands() function to perform request on GET /brands endpoint.
       Left commented out for possible future backend enhancement
    */

    // getStatuses() {
    //   fetchStatuses()
    //     .then(res => this.statuses = res.data.value)
    //     .catch(err => console.log(err))
    // },

    getStatuses() {
      this.statuses = statusesArr
    },

    filterTrucks(obj) {
      console.log(obj)

      filterItems(obj)
        .then(res => this.cars = res.data.value)
        .catch(err => console.log(err))
    },
  },
})
