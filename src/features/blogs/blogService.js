import axios from "axios";
import { base_url } from "../../utils/base_urls";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog._id}`,
    blog.blogData,
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
