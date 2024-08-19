import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Loading= ()=>{
    return(
    <div className="loading">
      <CircularProgress />
      loading data please wait!
    </div>)
}
export default Loading;