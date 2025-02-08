import { useState } from "react";
import "../App.css";
import Api from "../Api/Api";

function Todo() {
  const [apiData, setApiData] = useState([]);
  const [PostUser, setPostUser] = useState(null); // Store PostUser function from Api.js
  const [deleteUser, setDeleteUser] = useState(null); // Store DeleteUser function from Api.js
  const [editUser,setEditUser]=useState(null); //Store EditUser function from Api.js
  const [inputData, setInputData] = useState({
    name: "",
    age: "",
    contact: ""
  });

  function handleChange(e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (PostUser) {
      console.log("Sending data:", inputData);
      PostUser(inputData); // Call PostUser from Api.js
    } else {
      console.error("PostUser function is not available yet!");
    }
  };
  const handleDelete=(e)=>{
    if (deleteUser) {
      console.log("Sending data:", e);
      deleteUser(e); // Call deleteUser from Api.js
    } else {
      console.error("Detele function is not available yet!");
    }
  }
  const handleEdit=(e)=>{
    if (editUser) {
      console.log("Sending data:", e);
      editUser(e); // Call editUser from Api.js
    } else {
      console.error("Detele function is not available yet!");
    }
  }

  return (
    <>
      <h1>Enter Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={inputData.name} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={inputData.age} />
        <input type="number" name="contact" placeholder="Contact" onChange={handleChange} value={inputData.contact} />
        <button type="submit">Submit</button>
      </form>

      {/* Pass setPostUser function */}
      <Api onDataFetched={setApiData} setPostUser={setPostUser}  setDeleteUser={setDeleteUser}/>

      <h2>Fetched Data:</h2>
      <table className="border-separate border-2 border-red-400">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.contact}</td>
              <td>
                <button onClick={()=>{handleEdit(item.id)}}>Edit</button>
              
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todo;
