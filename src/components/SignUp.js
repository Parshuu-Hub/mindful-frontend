import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState("male");
  const [source, setSource] = useState("");
  const [city, setCity] = useState("mumbai");
  const [state, setState] = useState("gujarat");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user-signUp-info");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSource((pre) => {
      if (isChecked) {
        return [...pre, value];
      } else {
        return pre.filter((item) => item !== value);
      }
    });
  };

  const signUp = async () => {

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !source ||
      !city ||
      !state
    ) {
      alert("Please fill all details")
      return false;
    }
    const data = { name, email, password, phone, gender, source, city };

    let result = await fetch("https://mindful-backend.vercel.app/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("user-signUp-info", JSON.stringify(result.data));
    localStorage.setItem("token", JSON.stringify(result.auth));
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
     

      <input
        className="signUpinputBox"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter email"
      />
      

      <input
        className="signUpinputBox"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      />

      <input
        className="signUpinputBox"
        value={phone}
        required
        onChange={(e) => setPhone(e.target.value)}
        type="number"
        placeholder="Enter phone number"
      />
    
      <div className="signUpinputBox">
        Gender :{" "}
        <input
          type="radio"
          value={"male"}
          name="gender"
          checked={gender === "male"}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
        <input
          type="radio"
          value={"female"}
          name="gender"
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
        <input
          type="radio"
          value={"others"}
          name="gender"
          checked={gender === "others"}
          onChange={(e) => setGender(e.target.value)}
        />
        Others
      </div>

      <div className="signUpinputBox">
        How did you hear about this?
        <br />
        <input type="checkbox" value="LinkedIn" checked={source.includes('LinkedIn')}
          onChange={handleCheckboxChange} />
        LinkedIn
        <input type="checkbox" value="Friends" checked={source.includes('Friends')}
          onChange={handleCheckboxChange} />
        Friends
        <input
          type="checkbox"
          value="Job Portal"
          checked={source.includes('Job Portal')}
          onChange={handleCheckboxChange}
        />
        Job Portal
        <input type="checkbox" value="Others" checked={source.includes('Others')}
          onChange={handleCheckboxChange} />
        Others
      </div>

      <div className="signUpinputBox">
        City :
        <select value={city} onChange={(e)=>setCity(e.target.value)} style={{ marginLeft: "70px" }}>
          <option value="mumbai">Mumbai</option>
          <option value="pune">Pune</option>
          <option value="ahmedabad">Ahmedabad</option>
        </select>
      </div>

      <div className="signUpinputBox">
        State :
        <select value={state} onChange={(e)=>setState(e.target.value)} style={{ marginLeft: "60px" }}>
          <option value="gujarat">Gujarat</option>
          <option value="maharashtra">Maharashtra</option>
          <option value="karnataka">Karnataka</option>
        </select>
      </div>

      <button onClick={signUp} className="signUpbtn" type="button">
        Sign Up
      </button>
    </div>
  );
};
