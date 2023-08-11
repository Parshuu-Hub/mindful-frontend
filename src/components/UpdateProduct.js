import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {useParams,useNavigate} from 'react-router-dom';

export const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params=useParams();
  const navigate=useNavigate();
  
  useEffect(()=>{
    getProductDetails();
  },[])


  const clearInput=()=>{
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
  }

  const getProductDetails=async ()=>{
    let result=await fetch(`http://localhost:9000/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
    }
    })
    result=await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct=async ()=>{
    const data={name,price,category,company};

    let result=await fetch(`http://localhost:9000/update/${params.id}`,{
      method:'put',
      body:JSON.stringify(data),
      headers:{
        "Access":"application/json",
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        
      }
    });
    result=await result.json();
    if(result){
      clearInput();
      navigate('/')
    }
  }
 

  return (
    <div className="update">
      <h1 style={{ marginLeft: "50px" }}>Update Product</h1>
      <input
        className="productInputBox updateProduct"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />

      <input
        className="productInputBox updateProduct"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="Enter price"
      />

      <input
        className="productInputBox updateProduct"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter category"
      />
      
      <input
        className="productInputBox updateProduct"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Enter company"
      />
      
      <button onClick={updateProduct} className="updateProductBtn" type="button">
        UPDATE
      </button>
    </div>
  );
};
