import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result = await fetch("https://mindful-backend.vercel.app/usersList",{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
    });
    result = await result.json();
    setUsers(result);
  };

  const deleteRecord = async (id) => {
    let result = await fetch(`https://mindful-backend.vercel.app/user/${id}`, {
      method: "delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
    }
    });
    result = await result.json();
    if (result) {
      getUsers();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`https://mindful-backend.vercel.app/search/${key}`,{
        method:"GET",
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
      });
      result = await result.json();
      setUsers(result);
    }else{
      getUsers();
    }
  };

  return (
    <div className="user-list">
      <h1>Users List</h1>
      <input
        type="text"
        className="searchBox"
        onChange={handleSearch}
        placeholder="Search user"
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li style={{width:"250px"}}>Email</li>
        <li>Phone</li>
        <li>Operations</li>
      </ul>
      {users.length > 0 ? (
        users.map((item, i) => (
          <ul key={i}>
            <li>{i + 1}</li>
            <li>{item.name}</li>
            <li style={{width:"250px"}}>{item.email}</li>
            <li>{item.phone}</li>
            <li>
              <button className="delbtn" onClick={() => deleteRecord(item._id)}>
                Delete
              </button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
};
