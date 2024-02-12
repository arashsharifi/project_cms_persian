import React from "react";
import "../DeleteModal/DeleteModal.css";
import ReactDOM from "react-dom";
export default function DeleteModal({ submitAction, cancelAction, title }) {
  return ReactDOM.createPortal(
    <div className="modal-parent active ">
      <div className="delete-modal">
        <h1>{title}</h1>
        <div className="delete-modal-btns">
          <button
            onClick={() => submitAction()}
            className="delete-btn delete-modal-accept-btn"
          >
            بله
          </button>
          <button
            onClick={() => cancelAction()}
            className="delete-btn delete-modal-reject-btn"
          >
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
