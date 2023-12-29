import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "./user.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./edituser";

const Users = () => {
  const [users, setUsers] = useState([]);
  // Add editingIndex state
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [urole, setRole] = useState("");
  const [userId, setSelectedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //get users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/auth/users`
      );
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
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  //for update
  const handleOpenEditModal = (userId, uname, uemail, urole) => {
    setSelectedId(userId);
    setName(uname);
    setEmail(uemail);
    setRole(urole);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedId(null);
    setName("");
    setEmail("");
    setRole("");
    setIsEditModalOpen(false);
  };

  //update
  const handleUpdate = async (
    userId,
    updatedUserName,
    updatedUserEmail,
    updatedUserRole
  ) => {
    try {
      const response = await axios.put(
        `https://hub4-back.vercel.app/category/update_user/${userId}`,
        {
          name: updatedUserName,
          email: updatedUserEmail,
          role: updatedUserRole,
        }
      );
      if (response.data.updatedUser) {
        const updatedUsers = users.map((user) =>
          user._id === userId
            ? {
                ...user,
                name: response.data.updatedUser.name,
                email: response.data.updatedUser.email,
                role: response.data.updatedUser.role,
              }
            : user
        );
        setUsers(updatedUsers);
        toast.success("Updated successfully!");
        handleCloseEditModal();
      } else {
        toast.error("Error in updating. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in updating. Please try again.");
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
                return (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleOpenEditModal(u._id, u.name, u.email, u.role)
                        }
                        className="userbtn"
                        title="Update"
                      >
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
              {isEditModalOpen && (
                <EditUser
                  userId={userId}
                  onClose={handleCloseEditModal}
                  onUpdate={handleUpdate}
                  uname={uname}
                  uemail={uemail}
                  urole={urole}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
