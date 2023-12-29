import React, { useState } from "react";
import "./edituser.css";

const EditUser = ({ onClose, onUpdate, userId, uname, uemail, urole }) => {
  const [updatedName, setUpdatedName] = useState(uname);
  const [updatedEmail, setUpdatedEmail] = useState(uemail);
  const [updatedRole, setUpdatedRole] = useState(urole);
  const handleUpdate = () => {
    onUpdate(userId, updatedName, updatedEmail, updatedRole);
    // Close the modal
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="edit-overlay">
      <div className="edit-content">
        <h3 className="edittext">Update User Details</h3>
        <div className="usergroup">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="addemp form-control"
            id="inputName"
            placeholder="Enter Name"
            required
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>
        <div className="usergroup">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="addemp form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            required
            autoComplete="off"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </div>
        <div className="usergroup">
          <label
            htmlFor="category"
            className="form-label"
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
          >
            Role
          </label>
          <select name="category" id="category" className="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="btns2grp">
          <button className="btnup " onClick={handleUpdate}>
            Update
          </button>
          <button className="btns " onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
