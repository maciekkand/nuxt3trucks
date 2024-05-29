import { useCarsStore } from '~/stores/carsStore'

const BASE_URL = 'http://localhost:4000'

/*
   Request to GET /brands endpoint left for possible future
   backend enhancement (see corresponding stores/carStore.js getBrands() function)
*/

// export function fetchBrands() {
//   return useFetch(`${BASE_URL}/brands`)
// }

/*
   Request to GET /statuses endpoint left for possible future
   backend enhancement (see corresponding stores/carStore.js getStatuses() function)
*/

// export function fetchStatuses() {
//   return useFetch(`${BASE_URL}/statuses`)
// }

export function fetchTrucks({ start = 0, limit = 10, sort = 'id', order = 'asc' }) {
  const carsStore = useCarsStore()

  return useFetch(`${BASE_URL}/trucks?_start=${start}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    onResponse(context) {
      carsStore.trucksCount = context.response.headers.get('X-Total-Count')
    },
  })
}

export function isTruckCodeUnique(newTruckCode) {
  return useFetch(`${BASE_URL}/trucks`)
    .then((res) => {
      const allCodes = res.data.value.map(el => el.code)
      const codeAlreadyExists = allCodes.includes(newTruckCode)

      return !codeAlreadyExists
    })
    .catch(err => console.log(err))
}

export function removeTruck(id) {
  return useFetch(`${BASE_URL}/trucks/${id}`, {
    method: 'DELETE',
  })
}

export function insertTruck(obj) {
  return useFetch(`${BASE_URL}/trucks`, {
    method: 'POST',
    body: obj,
  })
}

export function updateTruck(id, obj) {
  return useFetch(`${BASE_URL}/trucks/${id}`, {
    method: 'PUT',
    body: obj,
  })
}

export function filterItems(obj) {
  console.log(obj)

  const queryString = String(new URLSearchParams(obj))

  let finalQueryString = queryString
    .replace('code', 'code_like')
    .replace('brand', 'brand_like')
    .replace('description', 'description_like')

  finalQueryString = `${finalQueryString}&_sort=id&_order=ASC`

  console.log('%c finalQueryString = ' + finalQueryString, 'color: aqua')

  return useFetch(`${BASE_URL}/trucks?${finalQueryString}`)
}
