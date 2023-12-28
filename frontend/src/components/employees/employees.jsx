import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./employee.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employees = () => {
  const [employees, setEmployee] = useState([]);
  const [allEmployees, setAllEmployees] = useState(null);

  //get employee
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/employee/employee`
      );
      if (response.data.employees && response.data.employees.length > 0) {
        setAllEmployees(response.data.employees);
        setEmployee(response.data.employees);
      } else {
        console.log("No employees found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, [allEmployees]);

  //delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      // Send a delete request to the backend
      const response = await axios.delete(
        `https://hub4-back.vercel.app/employee/delete_employee/${employeeId}`
      );

      if (response.data.Status) {
        // If the delete operation is successful, update the employee list
        const updatedEmployees = employees.filter((e) => e._id !== employeeId);
        setEmployee(updatedEmployees);
        toast.success("Deleted successfully!");
      } else {
        alert(response.data.Error);
        toast.error("Error in deleting. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error in deleting. Please try again.");
    }
  };

  // Check if employees is defined before mapping
  const employeesList = employees || [];

  return (
    <div>
      <div className="empcontainer">
        <ToastContainer />
        <div className="empheader">
          <h3>Employee List</h3>
        </div>
        <div className="empcenter">
          <div class="empcustom-content">
            <div className="emptask">
              <Link to="/home/employee/add" className="emp-btn btn-9">
                <span>Add Employee</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="employee-card-container">
          {employeesList.map((e) => (
            <div className="employee-card" key={e._id}>
              <h4>{e.name}</h4>
              <p>Email: {e.email}</p>
              <p>Salary: {e.salary}</p>
              <p>Address: {e.address}</p>
              <p>Category: {e.categorys}</p>
              <div
                className="employee-card-actions"
                style={{ justifyContent: "flex-end" }}
              >
                <Link
                  to={`/home/employee/edit/${e._id}`}
                  className="customedit btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="customdelete btn-sm"
                  onClick={() => deleteEmployee(e._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;
