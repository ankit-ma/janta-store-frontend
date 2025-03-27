import React, { useState } from "react";

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe", position: "Manager" },
    { id: 2, name: "Jane Smith", position: "Cashier" },
  ]);
  const [newStaff, setNewStaff] = useState({ name: "", position: "" });

  const addStaff = () => {
    setStaff([...staff, { id: staff.length + 1, ...newStaff }]);
    setNewStaff({ name: "", position: "" });
  };

  const removeStaff = (id) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  return (
    <div>
      <h2>Staff Management</h2>
      <div>
        <h3>Total Staff: {staff.length}</h3>
        <ul>
          {staff.map((member) => (
            <li key={member.id}>
              {member.name} - {member.position}
              <button onClick={() => removeStaff(member.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add New Staff</h3>
        <input
          type="text"
          placeholder="Name"
          value={newStaff.name}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newStaff.position}
          onChange={(e) =>
            setNewStaff({ ...newStaff, position: e.target.value })
          }
        />
        <button onClick={addStaff}>Add Staff</button>
      </div>
    </div>
  );
};

export default StaffManagement;
