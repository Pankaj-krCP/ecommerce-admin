import axios from "axios";
import { base_url } from "../../utils/base_urls";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};

const brandService = {
  getBrands,
};

export default brandService;
