import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#001529", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please enter your new password</p>
        <form action="">
          <CustomInput
            type="password"
            name="password"
            placeholder="New Password"
            label="Password"
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="Confirm Password"
            label="Confirm Password"
          />
          <button
            className="border-0 px-3 py-2 text-white w-100"
            style={{ background: "#001529" }}
            type="submit"
          >
            Ok
          </button>
        </form>
        <div className="mb-3 text-center">
          <Link to="/" className="link">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
