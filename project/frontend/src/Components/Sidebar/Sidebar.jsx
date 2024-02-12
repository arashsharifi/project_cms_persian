import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <div className="slider">
      <h1 className="slidebar-title">به داشبورد خوش آمدید</h1>
      <ul className="slidebar-links">
        <li>
          <Link to="">
            <FaHome />
            صفحه اصلی{" "}
          </Link>
        </li>
        <li>
          <Link to="/Products">
            <BsFillBasket3Fill />
            محصولات{" "}
          </Link>
        </li>
        <li className="active">
          <Link to="/comments">
            <BiCommentDetail />
            کامنت ها{" "}
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUsers />
            کاربران
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <MdOutlineProductionQuantityLimits />
            سفارشات
          </Link>
        </li>
        <li>
          <Link to="offers">
            <MdLocalOffer />
            تخفیف ها{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
}
