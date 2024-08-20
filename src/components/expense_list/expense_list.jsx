import React, { useState } from "react";
import "./expense_list.css";
import { useAppContext } from "../appContext";
import TextField from "@mui/material/TextField";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";

export default function Expense_list() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [BudgetLine, setBudgetLine] = useState("All");
  const handleBudgetLineChange = (event) => {
    setBudgetLine(event.target.value);
  };
  const { sidebarHidden } = useAppContext();
  return (
    <div className="expense_list-main mainDiv">
      <div
        className={sidebarHidden ? "container containerFullSize" : " container"}
      >
        <div className="Searchform">
          <h3 className="formtitle">Expense Search</h3>
          <form action="">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Budget Line</InputLabel>
              <Select
               onChange={handleBudgetLineChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Budget Lineeeeeee "
                className="MUIInputs customSelect "
                value={BudgetLine}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <div className="amountSearch">
              <TextField
                // onChange={(e) => setBudgetLine(e.target.value)}
                required
                type="number"
                className="MUIInputs"
                id="outlined-basic1"
                label="From Amount"
                variant="outlined"
                defaultValue={1} 
              />
                
              <TextField
                // onChange={(e) => setBudgetLine(e.target.value)}
                required
                type="number"
                className="MUIInputs"
                id="outlined-basic1"
                label="To Amount"
                variant="outlined"
                defaultValue={99999999} 
              />
            </div>
            <div className="dateSearch">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  className="field"
                  label="From Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
                
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  className="field"
                  label="To Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
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
                  Muzaffar Muzaffar Market Segit Muzaffar Market Segit Muzaffar
                  Market Segit
                </td>
                <td>Technical</td>
                <td>nothing</td>
                {/* <td>noori</td> */}

                <td>
                  <div className="operations">
                    <button className="operationBtns">
                      <GrUpdate />
                    </button>
                    <button
                      // onClick={() => deleteUser(tbluser.u_id)}
                      className="operationBtns deletebtn"
                    >
                      <TiDelete />
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
