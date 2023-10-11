
import "./App.css";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { PrivateComponent } from "./components/PrivateComponent";
import { Login } from "./components/Login";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import { UpdateUser } from "./components/UpdateUser";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>

          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
