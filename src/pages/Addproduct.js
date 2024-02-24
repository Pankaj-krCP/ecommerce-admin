import { React, useEffect } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import ProductForm from "../components/ProductForm";

const Addproduct = () => {
  const newProductState = useSelector((state) => state.product);

  useEffect(() => {
    const { isSuccess, isError, createdProduct } = newProductState;
    if (isSuccess && createdProduct != "") {
      message.success("Product Added successfully!");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [newProductState.isSuccess, newProductState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <ProductForm />
      </div>
    </div>
  );
};

export default Addproduct;
