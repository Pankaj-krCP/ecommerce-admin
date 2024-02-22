import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { uploadImg, delImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";
import Dropzone from "react-dropzone";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  color: Yup.array().required("Colors are Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);

  useEffect(() => {
    if (images.length < imgState.length) {
      message.success("file uploaded successfully");
    } else if (images.length > imgState.length) {
      message.success("file deleted successfully");
    }
    const temp = [];
    imgState.forEach((i) => {
      temp.push({
        public_id: i.public_id,
        url: i.url,
      });
    });
    setImages(temp);
    formik.setFieldValue("images", temp);
  }, [imgState.length]);

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = images;
  }, [color, images]);

  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      _id: i._id,
      color: i.title,
    });
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
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            placeholder="Enter Product Title"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={() => formik.setFieldTouched("description", true)}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            type="number"
            placeholder="Enter Product Price"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            onBr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            className="form-control py-3"
            id=""
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            className="form-control py-3"
            id=""
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <Multiselect
            name="color"
            dataKey="id"
            textField="color"
            data={colors}
            onChange={(e) => setColor(e)}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            type="number"
            placeholder="Enter Product Quantity"
            label="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <div className="bg-light border rounded p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="cursor-pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <InboxOutlined className="fs-3" />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
