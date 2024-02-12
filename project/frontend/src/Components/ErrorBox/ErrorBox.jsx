import React from "react";
import "../ErrorBox/ErrorBox.css";
export default function ErrorBox({ msg }) {
  return (
    <div className="cms-emty-error">
      <h1>{msg}</h1>
    </div>
  );
}
