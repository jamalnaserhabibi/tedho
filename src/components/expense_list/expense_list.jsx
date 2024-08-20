import React, { useState } from "react";
import "./expense_list.css";
import { useAppContext } from "../appContext";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Expense_list() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { sidebarHidden } = useAppContext();
  return (
    <div className="expense_list-main mainDiv">
      <div
        className={sidebarHidden ? "container containerFullSize" : " container"}
      >
        <div className="Searchform">
          <h3 className="formtitle">Expense Search</h3>
          <form action="">
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
            to
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
          </form>
        </div>
        <hr />
        <div className="form tableStyle">
          <h3 className="FormTitle">User Accounts</h3>
          <table className="table">
            <tbody>
              <tr className="theader">
                <th>ID</th>
                <th>Budget Line</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Bill Info</th>
                <th>Category</th>
                <th>Desciption</th>
                {/* <th>Entered By</th> */}
                <th>Operation</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Salary</td>
                <td>2200</td>
                <td>2024/2/20</td>
                <td>
                  Muzaffar Muzaffar Market Segit Muzaffar Market Segit Muzaffar Market Segit
                </td>
                <td>Technical</td>
                <td>nothing</td>
                {/* <td>noori</td> */}

                <td>
                <div className="operations">
                  <button className="operationBtns">O</button> 
                  <button
                    // onClick={() => deleteUser(tbluser.u_id)}
                    className="operationBtns deletebtn"
                  >
                    X
                  </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
