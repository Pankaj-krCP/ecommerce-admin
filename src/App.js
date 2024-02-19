import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="reset-password" element={<Resetpassword />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
