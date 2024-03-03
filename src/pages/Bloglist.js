import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteABlog, resetState } from "../features/blogs/blogSlice";
import { delImg } from "../features/upload/uploadSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const [imgId, setimgId] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const showModal = (pid, img) => {
    setOpen(true);
    setblogId(pid);
    setimgId(img);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    imgId.forEach((ele) => {
      dispatch(delImg(ele.public_id));
    });

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const getBlogState = useSelector((state) => state.blog);

  useEffect(() => {
    setCount(getBlogState.blogs.length);
  }, [getBlogState.blogs.length]);

  useEffect(() => {
    const { isSuccess, isError } = getBlogState;
    if (isSuccess && blogId != "") {
      message.success("Blog deleted successfully!");
      setblogId("");
    }
    if (isError && blogId != "") {
      message.error("Something Went Wrong!");
      setblogId("");
    }
  }, [count]);

  const data1 = [];
  for (let i = 0; i < getBlogState.blogs.length; i++) {
    data1.push({
      key: i + 1,
      title: getBlogState.blogs[i].title,
      category: getBlogState.blogs[i].category,

      action: (
        <>
          <Link
            to={`/admin/blog/${getBlogState.blogs[i]._id}`}
            className="fs-5 text-blue"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-5 text-danger bg-transparent border-0"
            onClick={() =>
              showModal(getBlogState.blogs[i]._id, getBlogState.blogs[i].images)
            }
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog ?"
      />
    </div>
  );
};

export default Bloglist;
