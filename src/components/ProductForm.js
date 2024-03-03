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
import { resetState, restoreImages } from "../features/upload/uploadSlice";
import {
  createProducts,
  resetMsgState,
  updateAProduct,
} from "../features/product/productSlice";

const ProductForm = ({ productId }) => {
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
    const { isSuccess, isError, createdProduct, updatedProduct } =
      newProductState;
    if (
      (isSuccess && createdProduct != "") ||
      (isSuccess && updatedProduct != "")
    ) {
      formik.resetForm();
      setColor([]);
      dispatch(resetState());
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
    if (isError) {
      setTimeout(() => {
        dispatch(resetMsgState());
      }, 100);
    }
  }, [newProductState.isSuccess, newProductState.isError]);

  const productName = newProductState.products.filter(
    (ele) => ele._id == productId
  );

  useEffect(() => {
    setTimeout(() => {
      if (productName.length > 0) {
        setColor(productName[0].color);
        dispatch(restoreImages(productName[0].images));
        formik.values.images = productName[0].images;
      }
    }, 100);
  }, []);

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
      title: productName.length > 0 ? productName[0]?.title : "",
      description: productName.length > 0 ? productName[0]?.description : "",
      price: productName.length > 0 ? productName[0]?.price : "",
      brand: productName.length > 0 ? productName[0]?.brand : "",
      category: productName.length > 0 ? productName[0]?.category : "",
      color: productName.length > 0 ? productName[0]?.color : "",
      quantity: productName.length > 0 ? productName[0]?.quantity : "",
      images: productName.length > 0 ? productName[0]?.images : "",
      tags: productName.length > 0 ? productName[0]?.tags : "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      if (productId != undefined) {
        const data = { _id: productId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProducts(values));
      }
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
          {`${productId == undefined ? "Add " : "Update "}`} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
