// src/services/CarService.ts
import axios from "axios";

// const API_URL = 'http://localhost:8080/api/cars';
const API_URL = "http://localhost:8080/cars/ask?name=all";

class CarService {
  getCarByName(name: string) {
    return axios.get(`${API_URL}/${name}`);
  }

  getCarsByWheels(wheels: number) {
    return axios.get(`${API_URL}/wheels/${wheels}`);
  }

  getAllCars() {
    return axios.get(API_URL);
  }

  saveCar(car: { name: string; wheels: number }) {
    return axios.post(API_URL, car);
  }
}

export default new CarService();
