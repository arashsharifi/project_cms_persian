// import React from "react";

// export default function Layout() {
//   return (
//     <>
//       <Sidebar />
//       <div className="main">
//         <Header />

//         {router}
//       </div>
//     </>
//   );
// }
import "../Layout/Layout.css";
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
