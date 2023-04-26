import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart.js";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart,setCart] = useCart();

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get products count
  const getTotal = async() => {
    try {
      const {data} = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(page === 1) return;
    loadMore();
  },[page]);
  //load more products
  const loadMore = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products,...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //handle filters selected
  const handleFilter = (value,id) => {
    let all = [...checked];
    if(value)
    {
      all.push(id);
    }
    else{
      all = all.filter((c) => c !== id);  //if value is not checked then remove that id
    }
    setChecked(all);
  }

  //filter products
  const filterProduct = async() => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters",{checked,radio});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!checked.length && !radio.length) getAllProducts();
  }, [checked.length,radio.length]);

  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  }, [checked,radio]);
  return (
    <Layout title={"myEcom: Ecommerce App"}>
      <div className="row ">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories.map((c) => (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          <h4 className="text-center mt-2">Filter By Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="text-center m-2">
          <button className="btn btn-danger"
          onClick={() => window.location.reload()}>
              RESET FILTERS
          </button>
        </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
                  <button className="btn btn-secondary ms-1"onClick={() => {
                    setCart([...cart,p]);
                    localStorage.setItem("cart",JSON.stringify([...cart,p]))
                    toast.success("Item added to the cart");
                  }}>Add to cart</button>
                  </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
