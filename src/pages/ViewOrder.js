import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //   },
];

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const orderState = useSelector((state) => state.auth.orderbyuser.products);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].count,
      amount: orderState[i].product.price,
      color: orderState[i].product.color,
      date: orderState[i].product.createdAt,
      //   action: (
      //     <>
      //       <Link to="/" className=" fs-5 text-blue">
      //         <BiEdit />
      //       </Link>
      //       <Link className="ms-3 fs-5 text-danger" to="/">
      //         <AiFillDelete />
      //       </Link>
      //     </>
      //   ),
    });
  }
  return (
    <div>
      <div className="d-flex mb-4 justify-content-between align-items-center">
        <h3 className="mb-0 title">View Order</h3>
        <button
          className="bg-white border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
