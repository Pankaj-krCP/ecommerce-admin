import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    brand: brandReducer,
    product: productReducer,
    pCategory: pcategoryReducer,
    blog: blogReducer,
    bCategory: bcategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
