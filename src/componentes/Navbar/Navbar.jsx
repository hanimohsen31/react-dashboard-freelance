import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md w-100 cardStyle my-3">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center w-100">
              <li className="nav-item mx-3">
                <Link to="/">عرض&#160;الطلبات</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/add-category">اضافة&#160;فئة</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/add-product">اضافة&#160;منتج</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/categories">عرض&#160;الفئات</Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/products">عرض&#160;المنتجات</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
