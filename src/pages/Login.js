import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#001529", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
          />
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="link">
              Forgot Password
            </Link>
          </div>

          <Link
            to="/admin"
            className="button border-0 px-3 py-2"
            style={{ background: "#001529" }}
            type="submit"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
