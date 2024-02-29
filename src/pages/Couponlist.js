import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  deleteACoupon,
  resetState,
} from "../features/coupon/couponSlice";
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
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon);

  useEffect(() => {
    setCount(couponState.coupons.length);
  }, [couponState.coupons.length]);

  useEffect(() => {
    const { isSuccess, isError } = couponState;
    if (isSuccess && couponId != "") {
      message.success("Coupon deleted successfully!");
      setcouponId("");
    }
    if (isError && couponId != "") {
      message.error("Something Went Wrong!");
      setcouponId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < couponState.coupons.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState.coupons[i].name,
      discount: couponState.coupons[i].discount,
      expiry: new Date(couponState.coupons[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState.coupons[i]._id}`}
            className="fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState.coupons[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default Couponlist;
