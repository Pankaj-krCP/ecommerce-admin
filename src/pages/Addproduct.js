import { React, useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetMsgState } from "../features/product/productSlice";
import ProductForm from "../components/ProductForm";

const Addproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[3];
  const newProductState = useSelector((state) => state.product);

  useEffect(() => {
    const { isSuccess, isError, createdProduct, updatedProduct } =
      newProductState;
    if (isSuccess && createdProduct != "") {
      message.success("Product Added successfully!");
    }
    if (isSuccess && updatedProduct != "") {
      message.success("Product Updated Successfully!");
      navigate("/admin/product-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newProductState.isSuccess, newProductState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">
        {`${getProductId == undefined ? "Add " : "Edit "}`}
        Product
      </h3>
      <ProductForm productId={getProductId} />
    </div>
  );
};

export default Addproduct;
