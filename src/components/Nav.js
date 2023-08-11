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
    src="https://static.vecteezy.com/system/resources/previews/003/092/544/original/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg"
    alt="logo"
     />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Product</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          {/* <li>
            <Link to={"/update"}>Update Product</Link>
          </li> */}

          <li>
            <Link to={"/profile"}>Profile</Link>
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
