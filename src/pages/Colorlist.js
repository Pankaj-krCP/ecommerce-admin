import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getColors,
  deleteAColor,
  resetState,
} from "../features/color/colorSlice";
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

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color);

  useEffect(() => {
    setCount(colorState.colors.length);
  }, [colorState.colors.length]);

  useEffect(() => {
    const { isSuccess, isError } = colorState;
    if (isSuccess && colorId != "") {
      message.success("Color deleted successfully!");
      setcolorId("");
    }
    if (isError && colorId != "") {
      message.error("Something Went Wrong!");
      setcolorId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < colorState.colors.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState.colors[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colorState.colors[i]._id}`}
            className="fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState.colors[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Colorlist;
