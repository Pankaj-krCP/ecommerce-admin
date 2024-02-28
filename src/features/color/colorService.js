import axios from "axios";
import { base_url } from "../../utils/base_urls";
import { config } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color._id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  updateColor,
  deleteColor,
};

export default colorService;
