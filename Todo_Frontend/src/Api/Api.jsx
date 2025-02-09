import axios from "axios";
import { useState, useEffect } from "react";

const Api = ({ onDataFetched, setPostUser, setDeleteUser, setEditUser}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
    setPostUser(() => PostUser); // Set the PostUser function in App.js
    setDeleteUser(()=> deleteUser)// set the DeleteUser function in App.js
    setEditUser(()=> editUser)
  }, []);

  // Function to fetch data
  async function getUser() {
    try {
      const response = await axios.get("http://localhost:8000/get");
      onDataFetched(response.data); // Send fetched data to App.js
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // Function to post data
  async function PostUser(userData) {
    try {
        const response = await axios.post("http://localhost:8000/add", userData, {
            headers: { 
                "Content-Type": "application/json" 
            }
        });

        console.log("POST Response:", response.status);
        getUser(); // Refresh table data
    } catch (error) {
        console.error("Error posting data:", error.response ? error.response.data : error);
    }
}

// Function to update data
async function editUser(editId,editData) {
  console.log("Hello editor: ",editId, "  DAta: ",editData);
  
  try {
    const response = await axios.put(`http://localhost:8000/update/${editId}`, editData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Update Response:", response.status);
    getUser(); // Refresh table data
  } catch (error) {
    console.error("Error updating data:", error.response ? error.response.data : error);
  }
}


//Function to delete data
async function deleteUser(id) {
  console.log("api recieve: ",id);
  
  try {
    const response = await axios.delete(`http://localhost:8000/delete/${id}`);
    console.log(id,'ss');
    
  console.log("Delete Response:",await response.status);

        getUser(); // Refresh table data

  } catch (error) {
    console.log("Error: (API)",error);
    
  }
  
}

  return <p>{loading ? "Loading..." : ""}</p>;
};

export default Api;


