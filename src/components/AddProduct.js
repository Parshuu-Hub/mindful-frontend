import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [err,setErr]=useState(false);
  const navigate=useNavigate();


  const clearInput=()=>{
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
  }

  const addProduct=async ()=>{

    // console.log(!name);
    if(!name || !price || !category || !company){
      setErr(true);
      return false;
    }
    
      const userId=JSON.parse(localStorage.getItem("user-signUp-info"))._id;
      const data={name,price,category,company,userId};

    let addproduct=await fetch('http://localhost:9000/addProduct',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Access":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body:JSON.stringify(data)
    });
    addproduct=await addproduct.json();
    console.log(addproduct);
    clearInput();
    navigate('/');
    

  }
 

  return (
    <div className="add">
      <h1 style={{ marginLeft: "81px" }}>Add Product</h1>
      <input
        className="productInputBox addProduct"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />
      {err && !name && <span className="errorInput">Enter valid name</span>}

      <input
        className="productInputBox addProduct"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="Enter price"
      />
      {err && !price && <span className="errorInput">Enter valid price</span>}

      <input
        className="productInputBox addProduct"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter category"
      />
      {err && !category && <span className="errorInput">Enter valid category</span>}
     
      <input
        className="productInputBox addProduct"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Enter company"
      />
      {err && !company && <span className="errorInput display">Enter valid company</span>}

      <button onClick={addProduct} className="addproductBtn" type="button">
        ADD
      </button>
    </div>
  );
};
