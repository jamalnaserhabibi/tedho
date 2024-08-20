import React, { useState, useEffect } from "react";
import "./users.css";
import { useAppContext } from "../appContext";
import axios from "axios";
import { format, yearsToMonths } from "date-fns";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { useNotification } from "../../tools/notification";
import Loading from "../../tools/loading";
import { Popconfirm } from "antd"; 
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function Users() {
  const { openNotification, contextHolder } = useNotification();
  const [username, setusername] = useState("");
  const [pwd, setpwd] = useState("");
  const [usertype, setusertype] = useState("");
  const [file, setFile] = useState({});
  const uname = sessionStorage.getItem("userName");
  const [loading, setLoading] = useState(true);
  const [userList, setUsersList] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:8080/tedho/api/Users/")
      .then(function (response) {
        setUsersList(response.data || [{}]);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("pwd", pwd);
      formData.append("usertype", usertype);
      formData.append("creator", uname);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8080/tedho/api/Users/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data) {
        openNotification("top", response.data["status"], response.data["msg"]);
        fetchData();
        document.getElementById("username").value = "";
        document.getElementById("pwd").value = "";
        document.getElementById("usertype").selectedIndex = 0;
        document.getElementById("imgfile").value = "";
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/tedho/api/Users/${id}`)
      .then(function (response) {
        openNotification("top", response.data["status"], response.data["msg"]);
        fetchData();
      });
  };

  const { sidebarHidden } = useAppContext();

  return (
    <div className="user-main mainDiv">
      {contextHolder}
      {loading ? (
        <Loading />
      ) : (
        <div
          className={
            sidebarHidden ? "container containerFullSize" : " container"
          }
        >
          <div className="form">
            <h3 className="FormTitle">Add New User</h3>
            <form action="" onSubmit={handleSubmit}>
              <input
                id="username"
                minLength="4"
                required
                placeholder="Username"
                name="username"
                type="text"
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                id="pwd"
                minLength="4"
                required
                placeholder="Password"
                name="pwd"
                type="password"
                onChange={(e) => setpwd(e.target.value)}
              />
              <select
                value={usertype}
                name="usertype"
                onChange={(e) => setusertype(e.target.value)}
              >
                <option value="" selected disabled>
                  Select User Type
                </option>

                <option value="Administrator">Administrator</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Finance Officer">Finance Officer</option>
                <option value="Logistic">Logistic</option>
              </select>

              <input
                type="file"
                name="imgfile"
                id="imgfile"
                className="filebtn"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
              />

              <input className="btnAdd" type="submit" value="Add" />
            </form>
          </div>
          <hr />

          <div className="form tableStyle">
            <h3 className="FormTitle">User Accounts</h3>
            <table className="table">
              <tbody>
                <tr className="theader">
                  <th>ID</th>
                  <th>Username</th>
                  <th>Usertype</th>
                  <th>Created By</th>
                  <th>Created Date</th>
                  <th>Profile</th>
                  <th>Operations</th>
                </tr>
                {userList.map((tbluser, key) => (
                  <tr key={key}>
                    <td>{tbluser.u_id}</td>
                    <td>{tbluser.u_name}</td>
                    <td>{tbluser.u_type}</td>
                    <td>{tbluser.u_creator}</td>
                    <td>
                      {format(new Date(tbluser.u_date), "dd/MM/yyyy - hh:mm a")}
                    </td>
                    <td>
                      <img
                        className="profile"
                        src={`http://localhost:8080/tedho/api/Users/image/${
                          tbluser.u_img
                        }?${new Date().getTime()}`}
                        alt="downloading"
                      />
                    </td>
                    <td>
                      <div className="operations">
                        <button className="operationBtns">
                          <GrUpdate />
                        </button>

                        <Popconfirm
                           title={`Are you sure you want to delete?`}
                          onConfirm={() => deleteUser(tbluser.u_id)}
                          okText="Yes"
                          cancelText="No"
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: 'red',
                              }}
                            />
                          }
                        >
                          <button className="operationBtns deletebtn">
                            <TiDelete />
                          </button>
                        </Popconfirm>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
