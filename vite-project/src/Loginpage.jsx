import React, { useEffect, useState } from 'react'
import './style.css'

import { Navigate } from "react-router-dom";
export default function Loginpage() {
  const [logcode,setlogcode]=useState(0)
  const [data,setdata]=useState([])
  const [datadb,setdatadb]=useState([])
  useEffect(()=>{
    const getdata = async ()=>{
      try{
        const response = await axios.get("http://localhost:5000/api/login");
        console.log(response.data);
        
        setdatadb(response.data)   
                   
      }
      catch(error){
        console.log("error bhetla");
        }
    }; getdata();
  },[])
  const islogin = (event) => {
    const { name, value } = event.target;
    setdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  function checkdata(event){
    event.preventDefault();
    console.log(datadb);
    
    const user = datadb.find(
      (e) =>
        e.username.toLowerCase() === data.username.toLowerCase() &&
        e.password === data.password 
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if(user.accesstype == "Student"){
        setlogcode(1)
      }
      else if(user.accesstype == "Class Teacher"){
        setlogcode(2)
      }
      else if(user.accesstype == "Training and placement officer"){
        setlogcode(3)
      }
    } else {
      alert("Login nahi huva successful")
    }
    setdata({
      username : "",
      password : ""
    }) ;
    
  }
  const [Tosignup,setsp] = useState(false)
  function changes(){
    setsp(true);
    console.log(Tosignup);
    
  }
  return (
    <div>
      <div className="conatiner-fluid bg bg-grey pd-5">
        <div className="row justify-content-center ">
            <div className="col-sm-8   text-center mt-5 ">
              <div className="row">
                <div className="col-sm-1">
                  <img className='ms-5' src="logo.png" alt="" id="logo-login"/>
                </div>
              </div><br /><br />
              <h1 className='mt-5'>LOGIN TO YOUR ACCOUNT</h1>
                <div className="row justify-content-center">
               <div className="col-sm-6">
               <form onSubmit={(event)=>checkdata(event)}>
                    <hr /><br />
                    <input id='log' type="text" onChange={islogin}  value={data.username} className=" bg bg-grey border border-grey form-control" name='username' placeholder='  Username'/><br />
                    <input id='log' type="password" onChange={islogin} value={data.password} className="bg bg-grey border border-grey form-control " name='password' placeholder='  Password'/><br /><br />
                <br /><br />
                <button id='log-submit' type='submit' className='btn btn-success'><b>Sign In</b></button>
                </form>
                <br /><br /><br /><br /><br /><br />
                {
                  logcode === 1 ? <Navigate to="/Student" replace={true}></Navigate> : logcode === 2 ? <Navigate to="/classteacher" replace={true}></Navigate> : logcode === 3 ? <Navigate to="/tpo" replace={true}></Navigate> : ""
                }
               </div>
                </div>
            </div>
            <div className="col-sm-4 bg bg-success text-center"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <h1 className='text text-light'>Welcome to Sign In </h1><br />
                <h6 className='text text-light'>Don't have an account ? </h6><br />
                <button id='log-submit' onClick={changes} className='bg bg-light border border-light'>
                  <b>Sign Up</b>
                </button>
                {
                  Tosignup == true ? <Navigate to="/Signup"  replace={true} /> : ""
                }
            </div>
        </div>
      </div>
    </div>
  )
}
