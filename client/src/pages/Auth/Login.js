import React, { useState } from "react";
import {toast} from "react-toastify";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e)  =>{
    e.preventDefault();   //By default in js on a button click page is refreshed so we want to stop it with this
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
      console.log(res)
      if(res && res.data.success)
      {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate('/');
      }
      else
      {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("!!Something went wrong");
    }
  }

  return (
    <Layout title={"Register - myEcom"}>
      <div className="myform">
      <div className="r1">
        <h2 className="text-center" style={{fontWeight:"bold"}}>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
            />
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          <button type="submit" className="btn" style={{backgroundColor:"rgb(0, 255, 4)"}}>
            Login
          </button>
          </div>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
