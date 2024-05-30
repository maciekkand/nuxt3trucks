<script setup>
import { useCarsStore } from '../stores/carsStore'

const carsStore = useCarsStore()

const showDeleteModal = ref(false)
const showUpdateModal = ref(false)
const currentTruckId = ref(null)
const carId = ref(null)
const carCode = ref('')
const carBrand = ref('')
const carStatus = ref('')
const carDescription = ref('')

function getTrucks(obj) {
  const carsObj = {
    start: obj?.start,
    limit: obj?.limit,
    sort: obj?.sort,
    order: obj?.order,
  }

  carsStore.getTrucks(carsObj)
}

function deleteTruck(carId) {
  showDeleteModal.value = true
  currentTruckId.value = carId
}

async function shouldDelete(isDelete) {
  if (isDelete) {
    await removeTruck(currentTruckId.value)
    carsStore.getTrucks({})
    carsStore.filterTrucks({ queryString: carsStore.queryString })
  }

  showDeleteModal.value = false
}

function modifyTruck(car) {
  showUpdateModal.value = true
  carId.value = car.id
  carCode.value = car.code
  carBrand.value = car.brand
  carStatus.value = car.status
  carDescription.value = car.description
}

async function shouldUpdate(modifiedCar) {
  if (modifiedCar) {
    await updateTruck(modifiedCar.id, modifiedCar)
    carsStore.filterTrucks({ queryString: carsStore.queryString })
  }

  showUpdateModal.value = false
}

onMounted(() => {
  getTrucks()
})
</script>

<template>
  <div class="relative min-h-[670px]">
    <header>
      <h1 class="hidden text-3xl font-semibold 2xl:flex 2xl:justify-center 2xl:my-4">
        Trucks
      </h1>
    </header>

    <div>
      <PopupModal
        v-if="showDeleteModal"
        message="Are you sure?"
        alt="delete-row-confirmation-modal"
        @should-delete="shouldDelete"
      />

      <UpdateModal
        v-if="showUpdateModal"
        message="Car update form"
        alt="update-row-confirmation-modal"
        :car-id="carId"
        :car-code="carCode"
        :car-brand="carBrand"
        :car-status="carStatus"
        :car-description="carDescription"
        @should-update="shouldUpdate"
      />

      <div
        class="leading-[3rem] grid w-full grid-cols-10 mt-12 text-xl bg-neutral-300"
      >
        <p class="pl-8">
          #
        </p>
        <p class="-ml-6">
          Code
        </p>
        <p class="-ml-5">
          Brand
        </p>
        <p class="ml-3">
          Status
        </p>
        <p class="col-span-4 ml-16">
          Description
        </p>
      </div>

      <ul
        v-for="item in carsStore.cars"
        :key="item.id"
        data-test="cars-table-row"
        class="grid w-full grid-cols-10 text-lg odd:bg-neutral-300"
        alt="cars-table"
      >
        <li
          data-test="cars-table-id"
          class="py-3 pl-8"
          alt="cars-table-car-id"
        >
          {{ item.id }}
        </li>

        <li
          data-test="cars-table-brand"
          class="py-3 text-left -ml-5"
          alt="cars-table-car-brand"
        >
          {{ item.code }}
        </li>

        <li
          data-test="cars-table-year"
          class="py-3 -ml-4"
          alt="cars-table-car-year"
        >
          {{ item.brand }}
        </li>

        <li
          data-test="cars-table-color"
          class="py-3 ml-4 w-32"
          alt="cars-table-car-color"
        >
          {{ item.status }}
        </li>

        <li
          data-test="cars-table-price"
          class="py-3 text-left ml-16 col-span-5"
          alt="cars-table-car-price"
        >
          {{ item.description }}
        </li>

        <li>
          <button
            data-test="cars-table-update"
            class="w-24 h-8 my-2 -ml-20 text-sm text-white bg-green-800 rounded-lg"
            alt="update-button"
            @click="modifyTruck(item)"
          >
            Update
          </button>

          <button
            data-test="cars-table-delete"
            class="w-16 h-8 my-4 ml-6 text-sm text-white bg-red-800 rounded-lg"
            alt="delete-button"
            @click="deleteTruck(item.id)"
          >
            Del
          </button>
        </li>
      </ul>
    </div>

    <TablePagination
      data-test="cars-table-pagination"
      class="flex justify-center mt-4 lg:mt-8"
      @new-pagination="getTrucks"
    />
  </div>
</template>
