import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {useParams,useNavigate} from 'react-router-dom';

export const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const params=useParams();
  const navigate=useNavigate();
  
  useEffect(()=>{
    getUserDetails();
  
  },[])


  const clearInput=()=>{
    setName('');
    setEmail('');
    setPhone(null);
  }

  const getUserDetails=async ()=>{
    let result=await fetch(`https://mindful-backend.vercel.app/user/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
    }
    })
    result=await result.json();
    console.log(result);
    setName(result.name);
    setEmail(result.email);
    setPhone(result.phone);
  }

  const updateUser=async ()=>{
    const data={name,email,phone};

    let result=await fetch(`https://mindful-backend.vercel.app/update/${params.id}`,{
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
      <h1 style={{ marginLeft: "50px" }}>Update User</h1>
      <input
        className="productInputBox updateProduct"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />

      <input
        className="productInputBox updateProduct"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter price"
      />

      <input
        className="productInputBox updateProduct"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Enter category"
      />
      
      <button onClick={updateUser} className="updateProductBtn" type="button">
        UPDATE
      </button>
    </div>
  );
};
