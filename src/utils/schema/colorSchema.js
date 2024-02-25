import * as Yup from "yup";

const colorSchema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});

export default colorSchema;
