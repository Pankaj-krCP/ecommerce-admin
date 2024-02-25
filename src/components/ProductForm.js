import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RequiredInput from "./RequiredInput";
import RequiredSelect from "./RequiredSelect";
import { tag } from "../utils/contsant";
import RequiredMultiSelect from "./RequiredMultiSelect";
import DragnDrop from "./DragnDrop";
import DescriptionInput from "./DescriptionInput";
import productSchema from "../utils/schema/productSchema";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { resetState as imgResetState } from "../features/upload/uploadSlice";
import {
  createProducts,
  resetState as productResetState,
} from "../features/product/productSlice";

const ProductForm = () => {
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload);
  const newProductState = useSelector((state) => state.product);

  useEffect(() => {
    const { isSuccess, isError, createdProduct } = newProductState;
    if (isSuccess && createdProduct != "") {
      formik.resetForm();
      setColor([]);
      dispatch(imgResetState());
      setTimeout(() => {
        dispatch(productResetState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(productResetState());
      }, 100);
    }
  }, [newProductState.isSuccess, newProductState.isError]);

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = imgState.images;
  }, [color, imgState.isSuccess]);

  const coloroptions = [];
  colorState.forEach((i) => {
    let flag = 0;
    color.forEach((j) => {
      if (i.title == j) flag = 1;
    });
    if (!flag) {
      coloroptions.push({
        label: i.title,
        value: i.title,
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
      tags: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <RequiredInput formik={formik} type={"text"} name={"title"} />
        <DescriptionInput formik={formik} />
        <RequiredSelect formik={formik} name={"brand"} object={brandState} />
        <RequiredSelect formik={formik} name={"category"} object={catState} />
        <RequiredSelect formik={formik} name={"tags"} object={tag} />
        <RequiredInput formik={formik} type={"number"} name={"price"} />
        <RequiredInput formik={formik} type={"number"} name={"quantity"} />

        <RequiredMultiSelect
          formik={formik}
          value={color}
          name={"color"}
          options={coloroptions}
          cb={setColor}
        />

        <DragnDrop />

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
