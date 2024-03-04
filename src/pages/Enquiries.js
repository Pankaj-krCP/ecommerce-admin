import React, { useEffect, useState } from "react";

import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setenquiryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enqState = useSelector((state) => state.enquiry);

  useEffect(() => {
    setCount(enqState.enquiries.length);
  }, [enqState.enquiries.length]);

  useEffect(() => {
    const { isSuccess, isError } = enqState;
    if (isSuccess && enquiryId != "") {
      message.success("Enquiry deleted Successfully!");
      setenquiryId("");
    }
    if (isError && enquiryId != "") {
      message.error("Something Went Wrong");
      setenquiryId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < enqState.enquiries.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState.enquiries[i].name,
      email: enqState.enquiries[i].email,
      mobile: enqState.enquiries[i].mobile,
      status: enqState.enquiries[i].status,
      action: (
        <>
          <Link
            className="ms-3 fs-5 text-blue"
            to={`/admin/enquiries/${enqState.enquiries[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState.enquiries[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiry(enquiryId);
        }}
        title="Are you sure you want to delete this Enquiry ?"
      />
    </div>
  );
};

export default Enquiries;
