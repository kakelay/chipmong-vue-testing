// src/services/CarService.ts
import axios from "axios";

// const API_URL = "http://localhost:8080/cars/ask?name=all";
const queryString = "?name=all";
const BaseUrl = "http://localhost:8080/cars";

class CarService {
  getCarByName(name: string) {
    return axios.get(`${BaseUrl}/${name}`);
  }

  getCarsByWheels(wheels: number) {
    return axios.get(`${BaseUrl}/wheels/${wheels}`);
  }

  getAllCars() {
    return axios.get(`${BaseUrl}/ask${queryString}`);
  }

  saveCar(car: { name: string; wheels: number }) {
    return axios.post(BaseUrl, car);
  }
}

export default new CarService();
