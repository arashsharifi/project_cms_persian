import React, { useEffect } from "react";
import "../DetailsModal/DetailsModal.css";
export default function DetailsModal({ onHide, children }) {
  //عملیات ویندو برای sideeffect
  useEffect(() => {
    const checkKey = (event) => {
      console.log(event);
      //   عدد مخصوص Escape
      if (event.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener("keydown", checkKey);
    //اینم پرفرمنسیوش که بعد از آنمانت شد این کامپوننت از حافظه پاک می کند
    return () => window.removeEventListener("keydown", checkKey);
  });
  return (
    <div className="modal-parent active">
      <div className="details-modal ">{children}</div>
    </div>
  );
}
