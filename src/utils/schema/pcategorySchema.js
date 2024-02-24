import * as Yup from "yup";

const pcategorySchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});

export default pcategorySchema;
