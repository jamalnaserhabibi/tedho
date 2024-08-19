import React from "react";
import './dashboard.css'
import { useAppContext } from '../appContext';
import loginCheck from "../loginCheck"
export default function Dashboard() {
  loginCheck();
  const { sidebarHidden } = useAppContext();
  return (
    <div className='dashboard-main mainDiv' >
      <div className={sidebarHidden ? 'container containerFullSize' : ' container'}>
      <h1>Dashboard</h1>
      </div>
    </div>
  )
}

