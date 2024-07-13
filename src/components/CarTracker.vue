<!-- src/components/CarTracker.vue -->
<template>
  <div>
    <h1>Car Wheel Tracker</h1>
    <form @submit.prevent="submitForm">
      <input v-model="carName" placeholder="Enter car name" />
      <button type="submit">Get Car Info</button>
    </form>

    <div v-if="carInfo !== undefined">
      <div v-if="carInfo !== null">
        <p>{{ carInfo }}</p>
      </div>

      <div v-else>
        <p>{{ carName }} is not on my list. Number of wheels?</p>
        <input
          v-model="carWheels"
          type="number"
          placeholder="Enter number of wheels"
        />
        <button @click="addCarInfo">Add Car Info</button>
      </div>
    </div>

    <button @click="getCarsByWheels(4)">Show 4-wheel cars</button>
    <button @click="getCarsByWheels(2)">Show 2-wheel cars</button>
    <button @click="getAllCars">Show All cars</button>

    <div v-if="carList.length > 0">
      <ul>
        <li v-for="(car, index) in carList" :key="index">
          {{ car }}
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
    const carInfo = ref<string | null | undefined>(undefined);
    const carList = ref<Array<string>>([]);

    const submitForm = async () => {
      if (carName.value.trim() === "") {
        alert("Please enter a car name.");
        return;
      }
      await getCarInfo();
    };

    const getCarInfo = async () => {
      try {
        const response = await CarService.getCarByName(carName.value);
        if (response.data && response.data.length > 0) {
          carInfo.value = response.data[0];
        } else {
          carInfo.value = null;
        }
        console.log("Car Info:", carInfo.value);
      } catch (error) {
        console.error("Error fetching car info:", error);
        carInfo.value = null;
      }
    };

    const addCarInfo = async () => {
      if (carName.value.trim() === "" || carWheels.value === null) {
        alert("Please enter both car name and number of wheels.");
        return;
      }

      const car = { name: carName.value, wheels: carWheels.value };
      try {
        await CarService.saveCar(car);
        carInfo.value = `${car.name} has ${car.wheels} wheels.`;
        console.log("Added Car Info:", car);
      } catch (error) {
        console.error("Error adding car info:", error);
      }
    };

    const getCarsByWheels = async (wheels: number) => {
      try {
        const response = await CarService.getCarsByWheels(wheels);
        carList.value = response.data;
      } catch (error) {
        console.error("Error fetching cars by wheels:", error);
      }
    };

    const getAllCars = async () => {
      try {
        const response = await CarService.getAllCars();
        carList.value = response.data;
      } catch (error) {
        console.error("Error fetching all cars:", error);
      }
    };

    return {
      carName,
      carWheels,
      carInfo,
      carList,
      submitForm,
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
