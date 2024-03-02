import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteACategory,
  resetState,
} from "../features/bcategory/bcategorySlice";
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

const Blogcatlist = () => {
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

  const bcategoryState = useSelector((state) => state.bCategory);

  useEffect(() => {
    setCount(bcategoryState.bCategories.length);
  }, [bcategoryState.bCategories.length]);

  useEffect(() => {
    setCount(bcategoryState.bCategories.length);
  }, [bcategoryState.bCategories.length]);

  useEffect(() => {
    const { isSuccess, isError } = bcategoryState;
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
  for (let i = 0; i < bcategoryState.bCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: bcategoryState.bCategories[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${bcategoryState.bCategories[i]._id}`}
            className=" fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(bcategoryState.bCategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
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

export default Blogcatlist;
