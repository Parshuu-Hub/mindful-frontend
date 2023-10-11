import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user-signUp-info");
    if (auth) {
      navigate("/");
    }
  }, []);

  const login = async () => {
    const data = { email, password };

    let result = await fetch("https://mindful-backend.vercel.app/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();
    console.log(result);

    if (result.auth) {
      localStorage.setItem("user-signUp-info", JSON.stringify(result.admin));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }else{
        alert("Please enter valid details")
    }
  };

  return (
    <div className="signUp">
      <h1 style={{ marginLeft: 120, marginTop: 20 }}>Login</h1>

      <input
        className="signUpinputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter email"
      />

      <input
        className="signUpinputBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      />

      <button onClick={login} className="signUpbtn" type="button">
        Login
      </button>
    </div>
  );
};
