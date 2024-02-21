import axios from "axios";
import { base_url } from "../../utils/base_urls";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};

const colorService = {
  getColors,
};

export default colorService;
