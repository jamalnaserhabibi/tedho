import React from "react";
import "./budget.css";
import { useAppContext } from "../appContext";

export default function Budget() {
  const { sidebarHidden } = useAppContext();
  return (
    <div className="budget-main mainDiv">
      <div
        className={sidebarHidden ? "container containerFullSize" : " container"}
      >
        <div className="headline">
          <h1>Budget</h1>
          <h3>Total Budget: 00.00</h3>
          <h3>Total Budget: 00.00</h3>
          <h3>Active Budget: 00.00</h3>
        </div>
        <div className="inputs">
          <h3>Add Budget</h3>
          <form action="">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  );
}
