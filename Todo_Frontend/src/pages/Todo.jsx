import { useState } from "react";
import Api from "../Api/Api";

function Todo() {
  const [apiData, setApiData] = useState([]);
  const [PostUser, setPostUser] = useState(null); // Store PostUser function from Api.js
  const [deleteUser, setDeleteUser] = useState(null); // Store DeleteUser function from Api.js
  const [editUser, setEditUser] = useState(null); //Store EditUser function from Api.js
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
      setInputData({
        name: "",
        age: "",
        contact: ""
      })
    } else {
      console.error("PostUser function is not available yet!");
    }
  };
  const handleDelete = (e) => {
    if (deleteUser) {
      console.log("Sending data:", e);
      deleteUser(e); // Call deleteUser from Api.js
    } else {
      console.error("Detele function is not available yet!");
    }
  }
  const handleEdit = (e) => {
    if (editUser) {
      console.log("Sending data:", e);
      editUser(e); // Call editUser from Api.js
    } else {
      console.error("Detele function is not available yet!");
    }
  }

  return (
    <>
      <Api onDataFetched={setApiData} setPostUser={setPostUser} setDeleteUser={setDeleteUser} />
      <h1 className="text-center font-bold text-5xl mb-20 mt-5">TODO APPLICATION</h1>
      <div className="m-10 grid lg:grid-cols-2">
        <div className="w-3/4 shadow-xl flex flex-col justify-center rounded-xl">
          <h1 className="font-bold text-3xl mb-5 bg-[#2f2c35] text-[#fdfefe] text-center p-3 rounded">Enter Employee Details</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5 p-5 w-2/2 items-center">
           
            <div class="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} value={inputData.name} type="text" name="name" id="floating_email" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder=" " required />
              <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} value={inputData.age} type="number" name="age" id="floating_password" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input onChange={handleChange} value={inputData.contact} type="number" name="contact" id="floating_password" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
            </div>
            <button className="hover:bg-gray-200 hover:text-[#27bbd0] bg-[#27bbd0] w-fit p-2 rounded-lg shadow-lg" type="submit">Submit</button>

          </form>
        </div>
        {/* Pass setPostUser function */}

        <div className="w-full">
          <h2 className="border-b font-bold text-3xl bg-[#2f2c35] text-[#fdfefe] p-3 rounded-sm">Employees Datas</h2>

          <table className=" bg-white shadow-lg rounded-lg shadow-md w-full text-center rounded-xl">
            <thead>
              <tr className="bg-[#2f2c35] text-[#27bbd0]">
                <th className="py-3 px-6 ">Id</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Age</th>
                <th className="py-3 px-6">Contact</th>
                <th className="py-3 px-6 ">Options</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, index) => (
                <tr key={index} className="shadow hover:bg-gray-100 p-2">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.age}</td>
                  <td className="py-3 px-6">{item.contact}</td>
                  
                    <td >
                      <button className="hover:bg-gray-200 hover:text-[#27bbd0] bg-[#27bbd0] m-1 px-3 py-1 rounded-lg" onClick={() => { handleEdit(item.id) }}>Edit</button>

                      <button className="hover:bg-gray-200 hover:text-[#27bbd0] bg-[#27bbd0] m-1 py-1 px-2 rounded-lg" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Todo;
