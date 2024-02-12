import React, { useEffect, useState } from "react";
import "../ProductsTable/ProductsTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditeModal from "../EditeModal/EditeModal";
import ErrorBox from "../ErrorBox/ErrorBox";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdOutlineTitle } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlinePointOfSale } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsTable({ allProducts, getAllProducts }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [productID, setProductID] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  // edit input states +++++++++++++++
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPopularity, setProductPopularity] = useState("");
  const [productSale, setProductSale] = useState("");
  const [productColors, setProductColors] = useState("");
  // edit input states +++++++++++++++

  function deleteModalHandler(proId) {
    setIsShowModal((prevState) => !prevState);
    console.log("modal is cancel ");
    setProductID(proId);
  }

  function deleteModalSubmitAction() {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowModal(false);
        console.log(result);
        toast.error("محصول حذف گردید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAllProducts();
      });
  }

  function detailHandler(obj) {
    setIsShowModalDetail((prevState) => !prevState);
    setMainProductInfos(obj);
  }

  function closeDetailHideHandler() {
    setIsShowModalDetail(false);
  }
  // .toLocaleString("en-US")
  function updateProductInfos(event) {
    event.preventDefault();

    let productsNewInfos = {
      title: productTitle,
      price: parseInt(productPrice),
      count: parseInt(productCount),
      img: productImg,
      popularity: parseInt(productPopularity),
      sale: parseInt(productSale),
      colors: parseInt(productColors),
    };
    console.log(productsNewInfos);
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.info("محصول ما ادیت شد", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAllProducts();
        setIsShowModalEdit(false);
      });
  }

  function closeEditeOnHideHandler() {
    setIsShowModalEdit(false);
  }

  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="product-table-tr">
                <td>
                  {" "}
                  <img
                    src={product.img}
                    alt="nooot"
                    className="products-table-img"
                  />
                </td>
                <td> {product.title}</td>
                <td>
                  {" "}
                  <span>{product.price.toLocaleString("fa-IR")}</span>هزار تومان
                </td>
                <td>{product.count.toLocaleString("fa-IR")}</td>
                <td>
                  <button
                    onClick={() => detailHandler(product)}
                    className="products-table-btn"
                  >
                    جزئیات
                  </button>
                  <button
                    onClick={() => deleteModalHandler(product.id)}
                    className="products-table-btn"
                  >
                    {" "}
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      setIsShowModalEdit(true);
                      setProductID(product.id);
                      setProductTitle(product.title);
                      setProductPrice(product.price);
                      setProductCount(product.count);
                      setProductImg(product.img);
                      setProductPopularity(product.popularity);
                      setProductColors(product.colors);
                      setProductSale(product.sale);
                    }}
                    className="products-table-btn"
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد " />
      )}

      {isShowModal && (
        <DeleteModal
          title="آیا مطمئنن هستی برای حذف کردن "
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalHandler}
        />
      )}

      {isShowModalDetail && (
        <DetailsModal onHide={closeDetailHideHandler}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگبندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfos.popularity.toLocaleString("fa-IR")}%</td>
                <td>{mainProductInfos.sale.toLocaleString("fa-IR")}</td>
                <td>{mainProductInfos.colors.toLocaleString("fa-IR")}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      {isShowModalEdit && (
        <EditeModal
          onClose={closeEditeOnHideHandler}
          onSubmit={updateProductInfos}
        >
          <div className="add-product-form-group">
            <span>
              <MdOutlineTitle className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="عنوان جدید را وارد کنید "
              // value={mainProductInfos.title}
              // readOnly
              value={productTitle}
              onChange={() => setProductTitle(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <AiOutlineDollarCircle className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="قیمت جدید را وارد کنید "
              value={productPrice.toLocaleString("fa-IR")}
              onChange={() => setProductPrice(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <MdOutlineInventory className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="مجودی جدید را وارد کنید "
              value={productCount.toLocaleString("fa-IR")}
              onChange={() => setProductCount(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <AiFillPicture className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید "
              value={productImg}
              onChange={() => setProductImg(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <AiFillLike className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="محبوبیت جدید را وارد کنید"
              value={productPopularity.toLocaleString("fa-IR")}
              onChange={() => setProductPopularity(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <MdOutlinePointOfSale className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="فروش جدید را وارد کنید"
              value={productSale.toLocaleString("fa-IR")}
              onChange={() => setProductSale(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <IoIosColorPalette className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              placeholder="رنگبندی جدید را وارد کنید"
              value={productColors.toLocaleString("fa-IR")}
              onChange={() => setProductColors(event.target.value)}
            />
          </div>
        </EditeModal>
      )}
      <ToastContainer />
    </>
  );
}
