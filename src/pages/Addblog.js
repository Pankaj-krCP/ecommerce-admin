import { React, useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetMsgState } from "../features/blogs/blogSlice";
import BlogForm from "../components/BlogForm";

const Addblog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];
  const newBlogState = useSelector((state) => state.blog);

  useEffect(() => {
    const { isSuccess, isError, createdBlog, updatedBlog } = newBlogState;
    if (isSuccess && createdBlog != "") {
      message.success("Blog Added Successfully!");
    }
    if (isSuccess && updatedBlog != "") {
      message.success("Blog Updated Successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
    dispatch(resetMsgState());
  }, [newBlogState.isSuccess, newBlogState.isError]);

  return (
    <div>
      <h3 className="mb-4 title">
        {`${getBlogId == undefined ? "Add " : "Edit "}`}
        Blog
      </h3>
      <BlogForm blogId={getBlogId} />
    </div>
  );
};

export default Addblog;
