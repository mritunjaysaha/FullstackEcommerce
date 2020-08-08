import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/product/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  getAdmin() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  addProduct(name, category, price) {
    return axios.post(
      API_URL + "add",
      { name, category, price },
      { headers: authHeader() }
    );
  }

  getProducts() {
    return axios.get(API_URL + "products", { headers: authHeader() });
  }
}

export default new UserService();
