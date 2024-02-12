import React, { useEffect, useState } from "react";
import "../AddNewProducts/AddNewProducts.css";
import { IoPricetags } from "react-icons/io5";
import { BiRename } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { IoMdColorPalette } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNewProducts({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      toast.success("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setToggle(false);
    }
  }, [toggle]);

  const submitHandler = (event) => {
    event.preventDefault();
    let newProduct = {
      title: newProductTitle,
      price: parseInt(newProductPrice),
      count: parseInt(newProductCount),
      img: newProductImg,
      popularity: parseInt(newProductPopularity),
      sale: parseInt(newProductSale),
      colors: parseInt(newProductColors),
    };
    fetch(`http://localhost:8000/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setToggle(true);
        emty();
      });
  };

  function emty() {
    getAllProducts();
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }
  return (
    <div className="products-main">
      <h1 className="product-title">افزودن محصول جدید </h1>
      <form action="#" className="add-products-form">
        <div className="add-products-form-warp">
          <div className="add-products-form-group">
            <BiRename className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="اسم محصول را بنویسید"
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <IoPricetags className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="قیمت محصول را بنویسید"
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <MdOutlineInventory className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="مجودی محصول را بنویسید"
              value={newProductCount}
              onChange={(event) => setNewProductCount(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <FaMapLocation className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="آدرس عکس محصول بنویسید"
              value={newProductImg}
              onChange={(event) => setNewProductImg(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <GrLike className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="میزان محبوبیت این محصول را بنویسید "
              value={newProductPopularity}
              onChange={(event) => setNewProductPopularity(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <FaFileInvoiceDollar className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="میزان فروش این محصول را بنویسید "
              value={newProductSale}
              onChange={(event) => setNewProductSale(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <IoMdColorPalette className="icon-pageproducts" />
            <input
              type="text"
              className="add-products-input"
              placeholder="تعداد رنگ بندی محصول را بنویسید "
              value={newProductColors}
              onChange={(event) => setNewProductColors(event.target.value)}
            />
          </div>
        </div>
        <button onClick={submitHandler} className="add-products-submit">
          ثبت محصول{" "}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
