import * as Yup from "yup";

const blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

export default blogSchema;
