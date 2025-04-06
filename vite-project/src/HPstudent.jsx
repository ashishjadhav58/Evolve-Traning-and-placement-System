import React, { useEffect, useState } from 'react'
import './style.css'
import Stddashboard from './Stddashboard'
import Stplacementdrive from './Stplacementdrive'
import StTNPEvent from './StTNPEvent'
import { Navigate } from "react-router-dom";
import StTNPResouces from './StTNPResouces'
import StSelfattendence from './StSelfattendence'
import StINTERVIEWINFORMATIONGROUPS from './StINTERVIEWINFORMATIONGROUPS'
import ProfileEdit from './ProfileEdit'
export default function HPstudent() {
  const [user,setuser]=useState(null)
  const [islog,setislog]=useState(!!localStorage.getItem("user"))
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setuser(storedUser);
      setislog(true);
    }
  }, []);
  
  function logout(){
    localStorage.removeItem("user");
    setislog(false);
  }
  const [choice,setchoice] = useState(1)
  function actionperform(e){
    switch(e.target.innerText){
      case "Dashboard":
        setchoice(1)
        break;
      case "Placement Drive":
          setchoice(2)
          break;
      case "T & P Event":
          setchoice(3)
          break;
      case "T & P Resouces":
          setchoice(4)
          break;
      case "self attendence":
          setchoice(5)
          break;
      case "Message":
          setchoice(6)
          break;
      case "PROFILE":
          setchoice(7)
          break;
    }
    
  }
  return (
    <div>
      { islog === false ? <Navigate to="/" replace={true} /> : null }


      <div className="container-fluid bg bg-light">
        <div className="row border border-secondary">
        <div className="col-sm-1">

</div>
            <div className="col-sm-4 p-4 text-center">
                <img id="logo-login" src="logo.png" alt="" />
            </div>
            <div className="col-sm-1">

            </div>
            <div className="col-sm-5 p-4 mt-1 text-center">
                <div className="row">
                    <div className="col-sm-4 ">
                    <button className='border border-light  btn btn-light p-1 bg bg-light '><b>Welcome  {user?.username || "Guest"} <br /> Student ID : {user?._id || "Guest"}</b></button>
                    </div>
                    <div className="col-sm-4">
                        <button className='border border-light  btn btn-secondary' onClick={(event)=>actionperform(event)}><b>PROFILE </b></button>
                    </div>
                    <div className="col-sm-4">
                        <button className='border border-light  btn btn-secondary' onClick={logout}><b>LOGOUT &#10238;</b></button>
                    </div>
                </div>
            </div>
            <div className="col-sm-2">

            </div>
        </div>
        <div className="row">
            <div className="col-sm-2 border border-secondary  text-start">
            <button id="dashboard-option" onClick={(event)=>actionperform(event)} className='btn btn-light mt-5 text-start' >Placement Drive</button>
            <button id="dashboard-option" onClick={(event)=>actionperform(event)} className='btn btn-light mt-5 text-start' >T & P Event </button>
            <button id="dashboard-option" onClick={(event)=>actionperform(event)} className='btn btn-light mt-5 text-start' >T & P Resouces</button>
            <button id="dashboard-option" onClick={(event)=>actionperform(event)} className='btn btn-light mt-5 text-start' >self attendence</button>
            <button id="dashboard-option" onClick={(event)=>actionperform(event)} className='btn btn-light mt-5 text-start mb-5 pb-5' >Message</button>
            </div>
            <div className="col-sm-9">
                {
                  choice === 2 || choice === 1 ? <Stplacementdrive/> : choice === 3 ? <StTNPEvent></StTNPEvent> : choice === 4 ? <StTNPResouces></StTNPResouces> : choice === 5 ? <StSelfattendence></StSelfattendence> : choice ===6 ? <StINTERVIEWINFORMATIONGROUPS></StINTERVIEWINFORMATIONGROUPS> :choice === 7 ? <ProfileEdit></ProfileEdit> : ""
                }
            </div>
        </div>
      </div>
    </div>
  )
}
