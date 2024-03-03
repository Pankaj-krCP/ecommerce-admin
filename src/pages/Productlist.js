import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteAProduct,
  resetState,
} from "../features/product/productSlice";
import { delImg } from "../features/upload/uploadSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const [imgId, setimgId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (pid, img) => {
    setOpen(true);
    setproductId(pid);
    setimgId(img);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    imgId.forEach((ele) => {
      dispatch(delImg(ele.public_id));
    });

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product);

  useEffect(() => {
    setCount(productState.products.length);
  }, [productState.products.length]);

  useEffect(() => {
    const { isSuccess, isError } = productState;
    if (isSuccess && productId != "") {
      message.success("Product deleted successfully!");
      setproductId("");
    }
    if (isError && productId != "") {
      message.error("Something Went Wrong!");
      setproductId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < productState.products.length; i++) {
    data1.push({
      key: i + 1,
      title: productState.products[i].title,
      brand: productState.products[i].brand,
      category: productState.products[i].category,
      color: productState.products[i].color,
      price: productState.products[i].price,
      action: (
        <>
          <Link
            to={`/admin/product/${productState.products[i]._id}`}
            className=" fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() =>
              showModal(
                productState.products[i]._id,
                productState.products[i].images
              )
            }
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product ?"
      />
    </div>
  );
};

export default Productlist;
