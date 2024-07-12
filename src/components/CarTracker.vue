<!-- src/components/CarTracker.vue -->
<template>
  <div>
    <h1>Car Wheel Tracker</h1>
    <input v-model="carName" placeholder="Enter car name" />
    <button @click="getCarInfo">Get Car Info</button>

    <div v-if="carInfo">
      <p>{{ carInfo.name }} has {{ carInfo.wheels }} wheels.</p>
    </div>

    <div v-if="carInfo === null">
      <p>{{ carName }} is not on my list. Number of wheels?</p>
      <input
        v-model="carWheels"
        type="number"
        placeholder="Enter number of wheels"
      />
      <button @click="addCarInfo">Add Car Info</button>
    </div>

    <button @click="getCarsByWheels(4)">Show 4-wheel cars</button>
    <button @click="getCarsByWheels(2)">Show 2-wheel cars</button>
    <button @click="getAllCars">Show All cars</button>

    <div v-if="carList.length > 0">
      <ul>
        <li v-for="car in carList" :key="car.id">
          {{ car.name }} ({{ car.wheels }} wheels)
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CarService from "../services/CarService";

export default defineComponent({
  name: "CarTracker",
  setup() {
    const carName = ref("");
    const carWheels = ref<number | null>(null);
    const carInfo = ref<{ name: string; wheels: number } | null | undefined>(
      undefined
    );
    const carList = ref<Array<{ id: number; name: string; wheels: number }>>(
      []
    );

    const getCarInfo = async () => {
      try {
        const response = await CarService.getCarByName(carName.value);
        carInfo.value = response.data;
      } catch (error) {
        carInfo.value = null;
      }
    };

    const addCarInfo = async () => {
      if (carName.value && carWheels.value !== null) {
        const car = { name: carName.value, wheels: carWheels.value };
        await CarService.saveCar(car);
        carInfo.value = car;
      }
    };

    const getCarsByWheels = async (wheels: number) => {
      const response = await CarService.getCarsByWheels(wheels);
      carList.value = response.data;
    };

    const getAllCars = async () => {
      const response = await CarService.getAllCars();
      carList.value = response.data;
      console.log(carList.value);
    };

    return {
      carName,
      carWheels,
      carInfo,
      carList,
      getCarInfo,
      addCarInfo,
      getCarsByWheels,
      getAllCars,
    };
  },
});
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
