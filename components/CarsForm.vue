<script setup>
import { useDebounceFn } from '@vueuse/core'
import { useCarsStore } from '../stores/carsStore'

const carsStore = useCarsStore()

const code = ref('')
const brand = ref('')
const status = ref('')
const description = ref('')
const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

const addButtonDisabled = computed(() => {
  if (code.value && brand.value && status.value)
    return false

  return true
})

const debouncedFilterItems = useDebounceFn(() => {
  filterItems()
}, 300)

function setCode() {
  code.value = carsStore.code
  debouncedFilterItems()
}

function setBrand(brandValue) {
  brand.value = brandValue
  filterItems()
}

function setStatus(statusValue) {
  status.value = statusValue
  filterItems()
}

function setDescription() {
  description.value = carsStore.description
  debouncedFilterItems()
}

function resetValidation(idSortOrder) {
  showAlert.value = false
  code.value = ''
  brand.value = ''
  status.value = ''
  description.value = ''
  carsStore.getTrucks({ order: idSortOrder })
}

function displayAlert(type, message) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

async function addItem() {
  const isCodeUnique = await isTruckCodeUnique(code.value)

  if (!isCodeUnique)
    return displayAlert('error', 'Truck code must be unique')

  const sanitizedCode = alphanumeric(code.value)
  carsStore.code = sanitizedCode

  const sanitizedDescription = alphanumericAndSingleSpaces(description.value)

  const obj = {
    code: sanitizedCode,
    brand: brand.value,
    status: status.value,
    description: sanitizedDescription,
  }

  await insertTruck(obj)

  resetValidation('desc')

  showAlert.value = true
  alertType.value = 'info'
  alertMessage.value = 'Added successfully'
}

function filterItems() {
  const carObj = {}
  code.value && (carObj.code = code.value)
  brand.value && (carObj.brand = brand.value)
  status.value && (carObj.status = status.value)
  description.value && (carObj.description = description.value)

  carsStore.filterTrucks(carObj)
}
</script>

<template>
  <div>
    <header>
      <h1 class="flex justify-center my-4 text-3xl font-semibold 2xl:hidden">
        Trucks
      </h1>
    </header>

    <div class="h-4 border border-white w-72">
      <CarsAlert
        v-if="showAlert"
        :type="alertType"
        :message="alertMessage"
        class="ml-10 -mt-6 2xl:mt-8 2xl:ml-0"
      />
    </div>

    <div class="flex justify-center gap-2 md:gap-7 2xl:my-6 2xl:flex-col 2xl:mr-8 2xl:mt-[5.5rem] 2xl:gap-[23px] 2xl:text-lg">
      <InputBox
        :value="code"
        :string-input="true"
        input-placeholder="Code"
        alt="car-price"
        @input="setCode"
      />

      <SelectBox
        type="Brand"
        :value="brand"
        @input="setBrand"
      />

      <SelectBox
        type="Status"
        :value="status"
        @input="setStatus"
      />

      <InputBox
        :value="description"
        :string-input="true"
        input-placeholder="Description"
        alt="car-price"
        @input="setDescription"
      />

      <button
        data-test="car-add-button"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px] disabled:opacity-50"
        alt="add-car-button"
        :disabled="addButtonDisabled"
        @click="addItem"
      >
        Add
      </button>

      <button
        data-test="car-reset-button"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] disabled:opacity-50"
        alt="reset-form-button"
        @click="resetValidation('asc')"
      >
        Reset
      </button>
    </div>
  </div>
</template>
