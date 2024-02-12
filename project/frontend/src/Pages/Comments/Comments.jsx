import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditeModal from "../../Components/EditeModal/EditeModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Comments/Comments.css";

export default function Comments() {
  const [AllComments, setAllComments] = useState([]);
  const [isShowModalDetails, setIsShowModalDetails] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalAccept, setIsShowModalAccept] = useState(false);
  const [mainBodyComment, setMainBodyComment] = useState("");
  const [productID, setProductID] = useState(null);

  async function getAllComments() {
    try {
      const response = await fetch("http://localhost:8000/api/comments");
      const result = await response.json();
      setAllComments(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllComments();
  }, []);

  console.log(AllComments);

  function closeDetailsModal() {
    setIsShowModalDetails(false);
  }

  function closeEditeModal() {
    setIsShowModalEdit(false);
  }

  function canseleHandler() {
    setIsShowModalDelete(false);
    setIsShowModalAccept(false);
  }

  function deleteHandlerSubmit() {
    setIsShowModalDelete(false);
    fetch(`http://localhost:8000/api/comments/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.error("محصول حذف گردید", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getAllComments();
      });
  }

  function editHandlerSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/api/comments/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainBodyComment,
      }),
    })
      .then((rest) => rest.json())
      .then((result) => {
        console.log(result);
        getAllComments();
        toast.info("کامنت با موفقییت ادیت شد ", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setIsShowModalEdit(false);
  }

  function acceptHnadlerSubmit() {
    fetch(`http://localhost:8000/api/comments/accept/${productID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllComments();
        toast.success("کامنت تایید شد ", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setIsShowModalAccept(false);
  }

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت ها</h1>
      {AllComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ ثبت کامنت</th>
              <th>ساعت</th>
            </tr>
          </thead>
          <tbody>
            {AllComments.map((commentsp) => (
              <tr key={commentsp.id}>
                <td>{commentsp.userID}</td>
                <td>{commentsp.productID} </td>
                <td>
                  <button
                    onClick={() => {
                      setMainBodyComment(commentsp.body);
                      setIsShowModalDetails(true);
                    }}
                  >
                    دیدن کامنت{" "}
                  </button>
                </td>
                <td>{commentsp.date}</td>
                <td>{commentsp.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      setProductID(commentsp.id);
                      setIsShowModalDelete(true);
                    }}
                    className="bg-error"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      setMainBodyComment(commentsp.body);
                      setIsShowModalEdit(true);
                      setProductID(commentsp.id);
                    }}
                    className="bg-info"
                  >
                    ویرایش
                  </button>
                  <button>پاسخ </button>
                  {commentsp.isAccept === 1 ? (
                    <p>تایید شد</p>
                  ) : (
                    <button
                      onClick={() => {
                        setIsShowModalAccept(true);
                        setProductID(commentsp.id);
                      }}
                    >
                      تایید
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد " />
      )}
      {isShowModalDetails && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal">{mainBodyComment}</p>
          <button onClick={closeDetailsModal} className="text-modal-close-btn">
            بستن
          </button>
        </DetailsModal>
      )}
      {isShowModalDelete && (
        <DeleteModal
          title="آیا از حذف اطمینان داری "
          submitAction={deleteHandlerSubmit}
          cancelAction={canseleHandler}
        />
      )}
      {isShowModalEdit && (
        <EditeModal onClose={closeEditeModal} onSubmit={editHandlerSubmit}>
          <textarea
            value={mainBodyComment}
            onChange={(event) => setMainBodyComment(event.target.value)}
            className="textareahh"
          ></textarea>
        </EditeModal>
      )}
      {isShowModalAccept && (
        <DeleteModal
          title=" آیا از تایید کردن مطمئن هستی "
          submitAction={acceptHnadlerSubmit}
          cancelAction={canseleHandler}
        />
      )}
      <ToastContainer />
    </div>
  );
}
