import React, { useEffect } from "react";
import "../EditeModal/EditeModal.css";
export default function EditeModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    const checkKey = (event) => {
      console.log(event);
      //   عدد مخصوص Escape
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", checkKey);
    //اینم پرفرمنسیوش که بعد از آنمانت شد این کامپوننت از حافظه پاک می کند
    return () => window.removeEventListener("keydown", checkKey);
  });
  return (
    <div className="modal-parent active ">
      <form action="#" className="edit-modal-form">
        <h1>اطلاعات جدیدرا وارد نمایید </h1>
        {children}
        <button onClick={onSubmit} className="edit-form-submit">
          ثبت اطلاعات جدید{" "}
        </button>
      </form>
    </div>
  );
}
