import React from "react";
import pic from "../../../public/img/person.jpg";
import { FaBell } from "react-icons/fa";
import { CiBrightnessUp } from "react-icons/ci";
import "../Header/Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="admin-profile">
        <img src={pic} alt="nooot" />
        <div>
          <h1>حسام رشیدی</h1>
          <h2>برنامه نویس فرانت اند </h2>
        </div>
      </div>
      <div className="header-left-section">
        <div className="search-box">
          <input type="text" placeholder="جستو جو بکنید .." />
          <button>جستوجو</button>
        </div>
        <button className="header-left-icon">
          <FaBell />
        </button>
        <button className="header-left-icon">
          <CiBrightnessUp />
        </button>
      </div>
    </div>
  );
}
