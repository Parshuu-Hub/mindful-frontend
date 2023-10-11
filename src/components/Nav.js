import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const auth = localStorage.getItem("user-signUp-info");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <>
    <img 
    className="ourlogo"
    src="logo.png"
    alt="logo"
     />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>User</Link>
          </li>
          <li>
            <Link to={"/add"}>Add User</Link>
          </li>
          
          <li>
            <Link onClick={logout} to={"/home"}>
              Logout({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/signup"}>SignUp</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </>
  );
};
