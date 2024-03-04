import axios from "axios";
import { base_url } from "../../utils/base_urls";
import { config } from "../../utils/axiosconfig";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const enquiryService = {
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
};

export default enquiryService;
