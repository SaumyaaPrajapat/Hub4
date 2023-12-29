import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "./user.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  //get users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/auth/users`
      );
      console.log("Server response:", response.data);
      if (response.data && response.data.length > 0) {
        setUsers(response.data);
      } else {
        console.log("No users found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://hub4-back.vercel.app/auth/users/${userId}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully");
        // Fetch users again after deletion
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  return (
    <div>
      <div className="empcontainer">
        <ToastContainer />
        <div className="empheader">
          <h3>User List</h3>
        </div>
        <div className="empcenter">
          <div class="empcustom-content">
            <div className="emptask">
              <Link to="/home/user/add" className="emp-btn btn-9">
                <span>Add User</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="emptable-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                console.log("User ID:", u._id);
                return (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <button className="userbtn" title="Update">
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="userbtn"
                        title="Delete"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
