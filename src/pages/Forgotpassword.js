import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#001529", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput
            type="email"
            name="email"
            placeholder="Email Address"
            label="Email"
          />
          <button
            className="button border-0 rounded px-3 py-2 mt-4"
            style={{ background: "#001529" }}
            type="submit"
          >
            Send Link
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

export default Forgotpassword;
