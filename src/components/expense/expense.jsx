import React, { useState } from "react";
import "./expense.css";
import { useAppContext } from "../appContext";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNotification } from "../../tools/notification";
import Loading from "../../tools/loading";
import axios from "axios";
export default function Expense() {
  const [loading, setLoading] = useState(false);
  //notification
  const { openNotification, contextHolder } = useNotification();

  //
  const { sidebarHidden } = useAppContext();

  const uname = sessionStorage.getItem("userName");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [budgetLine, setBudgetLine] = useState("");
  const [amount, setAmount] = useState("");
  const [billInfo, setBillInfo] = useState("");
  const [project, setProject] = useState("");
  const [cat, setCat] = useState("");
  const [des, setDes] = useState("");

  const expenseSend = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("budgetLine", budgetLine);
      formData.append("amount", amount);
      formData.append("date", selectedDate.format("YYYY-MM-DD")); // Format the date
      formData.append("billInfo", billInfo);
      formData.append("project", project);
      formData.append("cat", cat);
      formData.append("des", des);
      formData.append("author", uname);

      const responce = await axios.post(
        "http://localhost:8080/tedho/api/expense/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (responce.data) {
        openNotification("top", responce.data["status"], responce.data["msg"]);
        //fetchData();
        document.getElementById("outlined-basic1").value = "";
        document.getElementById("outlined-basic2").value = "";
        document.getElementById("outlined-basic3").value = "";
        document.getElementById("outlined-basic4").value = "";
        document.getElementById("outlined-basic5").value = "";
        document.getElementById("outlined-basic6").value = "";
      }
    } catch (error) {
      console.error("Error submitting the expense", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    await expenseSend();
  };

  return (
    <div className="expense-main mainDiv">
      {contextHolder}
      {loading ? (
        <Loading />
      ) : (
        <div
          className={
            sidebarHidden ? "container containerFullSize" : " container"
          }
        >
          <h1 className="containerTitle">Add Expense Item</h1>
          <div className="inputs">
            <form onSubmit={handleSubmitFile} action="">
              <div>
                <TextField
                  onChange={(e) => setBudgetLine(e.target.value)}
                  required
                  className="field"
                  id="outlined-basic1"
                  label="Budget Line"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="field"
                  id="outlined-basic2"
                  type="number"
                  label="Amount"
                  variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    className="field"
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <TextField
                  required
                  onChange={(e) => setBillInfo(e.target.value)}
                  className="field"
                  id="outlined-basic3"
                  label="Bill Info"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setProject(e.target.value)}
                  required
                  className="field"
                  id="outlined-basic4"
                  label="Project"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setCat(e.target.value)}
                  required
                  className="field"
                  id="outlined-basic5"
                  label="Category"
                  variant="outlined"
                />
              </div>
              <TextField
                onChange={(e) => setDes(e.target.value)}
                className="field des"
                id="outlined-basic6"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
              />

              <input className="btn" type="submit" value="Add" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
