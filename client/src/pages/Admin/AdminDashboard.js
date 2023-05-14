import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import profileIcon from "../../images/profile_icon.jpg"

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-7">
        <div className="d-flex flex-wrap justify-content-center mt-4">
            <img src={profileIcon} style={{height:"200px",width:"200px"}} alt="" />
            <div className="d-flex flex-column p-2" style={{margin:"20px"}}>
              <h5>Name : {auth?.user?.name}</h5>
              <h5>Email : {auth?.user?.email}</h5>
              <h5>Address : {auth?.user?.address}</h5>
              <h5>Contact No : {auth?.user?.phone}</h5>
            </div>
            </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard
