import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteACategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = (e) => {
    dispatch(deleteACategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const pcategoryState = useSelector((state) => state.pCategory);

  useEffect(() => {
    setCount(pcategoryState.pCategories.length);
  }, [pcategoryState.pCategories.length]);

  useEffect(() => {
    setCount(pcategoryState.pCategories.length);
  }, [pcategoryState.pCategories.length]);

  useEffect(() => {
    const { isSuccess, isError } = pcategoryState;
    if (isSuccess && categoryId != "") {
      message.success("Category deleted successfully!");
      setcategoryId("");
    }
    if (isError && categoryId != "") {
      message.error("Something Went Wrong!");
      setcategoryId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < pcategoryState.pCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: pcategoryState.pCategories[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${pcategoryState.pCategories[i]._id}`}
            className="fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(pcategoryState.pCategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category ?"
      />
    </div>
  );
};

export default Categorylist;
