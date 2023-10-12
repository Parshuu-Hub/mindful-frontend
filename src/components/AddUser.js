import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  
  const navigate=useNavigate();


  const clearInput=()=>{
    setName('');
    setEmail('');
    setPhone(null);
  }

  const addUser=async ()=>{

    // console.log(!name);
    if(!name || !email || !phone){
  
      alert("Please fill all details.");
      return false;
    }
    
      const userId=JSON.parse(localStorage.getItem("user-signUp-info"))._id;
      const data={name,email,phone,userId};

    let adduser=await fetch('https://mindful-backend.vercel.app/addUser',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Access":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body:JSON.stringify(data)
    });
    adduser=await adduser.json();
    console.log(adduser);
    clearInput();
    navigate('/');
    

  }
 

  return (
    <div className="add">
      <h1 style={{ marginLeft: "81px" }}>Add User</h1>
      <input
        className="productInputBox addProduct"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />
      

      <input
        className="productInputBox addProduct"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter email"
      />
      

      <input
        className="productInputBox addProduct"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Enter phone"
      />
      

      <button onClick={addUser} className="addproductBtn" type="button">
        ADD
      </button>
    </div>
  );
};
