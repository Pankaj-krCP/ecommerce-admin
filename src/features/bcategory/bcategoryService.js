import axios from "axios";
import { base_url } from "../../utils/base_urls";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};

const createBlogCategory = async (category) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    category,
    config
  );
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default bCategoryService;
