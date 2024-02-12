import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditeModal from "../../Components/EditeModal/EditeModal";

import { BiRename } from "react-icons/bi";
import { BiSolidRename } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { GrScorecard } from "react-icons/gr";
import { GiBuyCard } from "react-icons/gi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Users/Users.css";
export default function Users() {
  const [allUsers, setAllusers] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [userID, setUserID] = useState(null);

  // state edite +++++++++++
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordU, setPassWordU] = useState("");
  const [phoneU, setPhoneU] = useState("");
  const [cityU, setCityU] = useState("");
  const [emailu, setEmailu] = useState("");
  const [addressU, setAddressU] = useState("");
  const [scoreU, setScoreU] = useState("");
  const [byeU, setByeU] = useState("");

  async function getAllUsers() {
    try {
      const response = await fetch(`http://localhost:8000/api/users`);
      const result = await response.json();
      setAllusers(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(allUsers);
  function chancelHandlerModal() {
    setIsShowModalDelete(false);
  }

  function cancelHandlerEdit() {
    setIsShowModalEdit(false);
  }

  function deleteHandlerSubmit() {
    fetch(`http://localhost:8000/api/users/${userID}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUsers();
        toast.error("کابر حذف شد", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setIsShowModalDelete(false);
  }

  function editeHandlerSubmit(event) {
    event.preventDefault();
    const newUser = {
      firsname: name,
      lastname: lastName,
      username: userName,
      password: passwordU,
      phone: parseInt(phoneU),
      city: cityU,
      email: emailu,
      address: addressU,
      score: parseInt(scoreU),
      buy: parseInt(byeU),
    };
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUsers();
        toast.info("کاربر ویرایش شد", {
          position: "top-center",
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

  // async function deleteHandlerSubmit() {
  //   try {
  //     const res = await fetch(`http://localhost:8000/api/users/${userID}`, {
  //       method: "DELETE",
  //     });
  //     const result = await res.json();
  //     console.log(result);
  //     getAllUsers();
  //     if (result.success) {
  //       toast.error("کابر حذف شد", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
      {allUsers.length ? (
        <div className="cms-main">
          <h1 className="cms-title">لیست کاربران</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>یوزرنیم</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firsname}
                    {user.lastname}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowModalDelete(true);
                        setUserID(user.id);
                      }}
                      className="bg-error"
                    >
                      حذف
                    </button>
                    <button>جزئییات</button>
                    <button
                      onClick={() => {
                        setIsShowModalEdit(true);
                        setUserID(user.id);
                        setName(user.firsname);
                        setLastName(user.lastname);
                        setUserName(user.username);
                        setPassWordU(user.password);
                        setPhoneU(user.phone);
                        setCityU(user.city);
                        setEmailu(user.email);
                        setAddressU(user.address);
                        setScoreU(user.score);
                        setByeU(user.buy);
                      }}
                      className="bg-info"
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}

      {isShowModalDelete && (
        <DeleteModal
          title="آیا از حذف کاربر مطئن هستین ؟"
          cancelAction={chancelHandlerModal}
          submitAction={deleteHandlerSubmit}
        />
      )}
      {isShowModalEdit && (
        <EditeModal onClose={cancelHandlerEdit} onSubmit={editeHandlerSubmit}>
          <div className="add-product-form-group">
            <span>
              <BiRename className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={name}
              onChange={() => setName(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <BiSolidRename className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={lastName}
              onChange={() => setLastName(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <FaUserSecret className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={userName}
              onChange={() => setUserName(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <MdOutlinePassword className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={passwordU}
              onChange={() => setPassWord(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <FaPhone className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={phoneU}
              onChange={() => setPhoneU(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <FaCity className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={cityU}
              onChange={() => setCityU(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <AiTwotoneMail className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={emailu}
              onChange={() => setEmailu(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <FaRegAddressCard className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={addressU}
              onChange={() => setAddressU(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <GrScorecard className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={scoreU}
              onChange={() => setScoreU(event.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <span>
              <GiBuyCard className="item-Products" />
            </span>
            <input
              className="edit-product-input"
              type="text"
              value={byeU}
              onChange={() => setByeU(event.target.value)}
            />
          </div>
        </EditeModal>
      )}
      <ToastContainer />
    </>
  );
}
