import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {
  resetState,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiries(getEnqId));
    }, 100);
  };

  const enqName = enqState.enquiries.filter((ele) => ele._id == getEnqId);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 title">View Enquiry</h3>
          <button
            className="bg-white border-0 fs-6 mb-0 d-flex align-items-center gap-1"
            onClick={goBack}
          >
            <BiArrowBack className="fs-5" /> Go Back
          </button>
        </div>
        <div className="mt-5 bg-light p-4 d-flex gap-3 flex-column rounded-3">
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Name:</h5>
            <p className="mb-0">{enqName[0]?.name}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Mobile:</h5>
            <p className="mb-0">
              <a href={`tel:+91${enqName[0]?.mobile}`}>{enqName[0]?.mobile}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Email:</h5>
            <p className="mb-0">
              <a href={`mailto:${enqName[0]?.email}`}>{enqName[0]?.email}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Comment:</h5>
            <p className="mb-0">{enqName[0]?.comment}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Status:</h5>
            <p className="mb-0">{enqName[0]?.status}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Change Status:</h5>
            <div>
              <select
                name=""
                defaultValue={enqName[0]?.status}
                className="form-control form-select"
                id=""
                onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
