import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../components/Layout/Layout';

const CategoryProducts = () => {
    const params = useParams();
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState("");
    const navigate = useNavigate();

    //get products of particular category
    const getProductsByCategory = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/category-products/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(params?.slug) getProductsByCategory();
    },[params?.slug]);

  return (
    <Layout>
        <h3 className='text-center'>Category : {category?.name}</h3>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2 p-1" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-image/${p._id}`}
                  className="card-img-top h-80"
                  alt={p.name}
                  style={{maxHeight:"200px"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-text">&#x20B9; {p.price}</p>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between"}}>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                  </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-2">
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
          </div> */}
        </div>
    </Layout>
  )
}

export default CategoryProducts