import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useAuth } from '../context/auth.js'

const Homepage = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title={"myEcom: Ecommerce App"}>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Homepage