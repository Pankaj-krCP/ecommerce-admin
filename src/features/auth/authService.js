import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_urls";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrderById = async (id) => {
  const response = await axios.get(
    `${base_url}user/getorderbyid/${id}`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrderById,
  getOrders,
};

export default authService;
