import React, { useState } from "react";
import {toast} from "react-toastify";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)  =>{
    e.preventDefault();   //By default in js on a button click page is refreshed so we want to stop it with this
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address});
      console.log(res)
      if(res && res.data.success)
      {
        toast.success(res.data.message);
        navigate('/login');
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
        <h2 className="text-center" style={{fontWeight:"bold"}}>REGISTER</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e)=> setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter address"
              required
            />
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          <button type="submit"  className="btn" style={{backgroundColor:"rgb(0, 255, 4)"}}>
            Submit
          </button>
          </div>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
