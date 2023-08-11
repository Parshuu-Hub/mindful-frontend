import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:9000/products",{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteRecord = async (id) => {
    let result = await fetch(`http://localhost:9000/product/${id}`, {
      method: "delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
    }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:9000/search/${key}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
      });
      result = await result.json();
      setProducts(result);
    }else{
        getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        className="searchBox"
        onChange={handleSearch}
        placeholder="Search product"
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, i) => (
          <ul key={i}>
            <li>{i + 1}</li>
            <li>{item.name}</li>
            <li>Rs.{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button className="delbtn" onClick={() => deleteRecord(item._id)}>
                Delete
              </button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No record Found</h1>
      )}
    </div>
  );
};
