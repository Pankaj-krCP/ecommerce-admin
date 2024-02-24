import * as Yup from "yup";

const bcategorySchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});

export default bcategorySchema;
