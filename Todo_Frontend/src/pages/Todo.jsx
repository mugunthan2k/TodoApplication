import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "../components/Modal";
import ApiService from "../Api/Api";

const Todo = () => {
  const [apiData, setApiData] = useState([]);
  const [inputData, setInputData] = useState({ name: "", age: "", contact: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await ApiService.getUsers();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.addUser(inputData);
      setInputData({ name: "", age: "", contact: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await ApiService.updateUser(selectedItem.id, updatedData);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.deleteUser(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const filteredData = apiData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 py-5">Employee Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Form Section */}
        <div className=" bg-white h-100 shadow-lg rounded-lg ">
          <div className="bg-black rounded-t-lg text-white flex justify-center p-6 ">
          <h2 className="text-2xl font-semibold">Add Employee</h2>

          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5  p-10 w-2/2 items-center">

            <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleInputChange} value={inputData.name} type="text" name="name" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleInputChange} value={inputData.age} type="number" name="age" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={handleInputChange} value={inputData.contact} type="number" name="contact" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
            </div>
            <button className="hover:bg-gray-200 hover:text-[#27bbd0] bg-[#27bbd0] w-fit p-2 rounded-lg shadow-lg" type="submit">Submit</button>

          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-xl rounded-lg  col-span-2 ">
        <div className="bg-black rounded-t-lg text-white flex justify-between p-4 ">
          <h2 className="text-2xl font-semibold">Employee List</h2>
          <div className="relative z-0 group">
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">🔍Search...</label>
          </div>
          </div>
        
          <div className="overflow-x-auto h-80">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.age}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.contact}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        <LiaUserEditSolid className="inline-block" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <RiDeleteBin5Line className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Todo;