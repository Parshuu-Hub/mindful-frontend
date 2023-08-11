import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    const auth=localStorage.getItem('user-signUp-info');
    if(auth){
        navigate('/');
    }
  },[])

  const signUp = async () => {
    if(!name || !email || !password){
      setErr(true);
      return false;
    }
    const data = { name, email, password };

    let result = await fetch("http://localhost:9000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Access: "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem('user-signUp-info',JSON.stringify(result.data));
    localStorage.setItem('token',JSON.stringify(result.auth));
    navigate("/");
  };

  return (
    <div className="signUp">
      <h1 style={{ marginLeft: 106 }}>Register</h1>
      <input
        className="signUpinputBox"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter name"
      />
      {err && !name && <span className="errorInput">Please enter name</span>}

      <input
        className="signUpinputBox"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter email"
      />
      {err && !email && <span className="errorInput">Please enter email</span>}

      <input
        className="signUpinputBox"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      />
      {err && !password && <span className="errorInput display">Please enter password</span>}

      <button onClick={signUp} className="signUpbtn" type="button">
        Sign Up
      </button>
    </div>
  );
};
