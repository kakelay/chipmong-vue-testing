import axios from "axios";

const BaseUrl = "http://localhost:8080/cars";

class CarService {
  getCarByName(name: string) {
    return axios.get(`${BaseUrl}/ask`, { params: { name } });
  }

  getCarsByWheels(wheels: number) {
    return axios.get(`${BaseUrl}/wheels/${wheels}`);
  }

  getAllCars() {
    return axios.get(`${BaseUrl}/ask`, { params: { name: "all" } });
  }

  saveCar(car: { name: string; wheels: number }) {
    return axios.post(BaseUrl, car);
  }
}

export default new CarService();
