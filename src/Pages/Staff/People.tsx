import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  password: string;
};

export const People = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [handleVIsible, setHandleVIsible] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setName("");
    setEmail("");
    setRole("");
    setStatus("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    const newUser: User = { name, email, role, status, password };

    if (editIndex !== null) {
      // Edit existing user
      const updatedUsers = [...addUser];
      updatedUsers[editIndex] = newUser;
      setAddUser(updatedUsers);
    } else {
      // Add new user
      setAddUser((preUser) => [...preUser, newUser]);
    }

    handleClose(); // Optionally close the modal after submission
  };

  const handleDelete = (index: number) => {
    const updatedUsers = [...addUser];
    updatedUsers.splice(index, 1);
    setAddUser(updatedUsers);
  };

  const handleEdit = (index: number) => {
    const userToEdit = addUser[index];
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setRole(userToEdit.role);
    setStatus(userToEdit.status);
    setPassword(userToEdit.password);
    setEditIndex(index);
    handleOpen(); // Open the modal with the user data
  };

  return (
    <div className="w-full">
      <Button
        sx={{
          color: "white",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "white", color: "#1976d2" },
        }}
        onClick={handleOpen}
      >
        Add User
      </Button>
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">Name</th>
              <th className="w-1/5 text-center border border-gray-700">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700">Role</th>
              <th className="w-1/5 text-center border border-gray-700">
                Status
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="  flex justify-start items-center text-[12px]  gap-2  border border-gray-700 ">
                  <Avatar className="flex items-center justify-center  border border-gray-700">
                    {item.name.charAt(0)}
                  </Avatar>
                  {item.name}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.email}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.role}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.status}
                </td>
                <td className="w-1/5 text-center border-gray-700">
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => handleDelete(index)}
                  />
                  <EditIcon
                    fontSize="small"
                    onClick={() => handleEdit(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          >
            <option value="">Select a role</option>
            <option value="Graphics Designer">Graphics Designer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Video Editor">Video Editor</option>
            <option value="Animation">Animation</option>
            <option value="Content Writer">Content Writer</option>
          </select>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border-black border-2  w-full"
            required
          >
            <option value="">Select a status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
          <label htmlFor="password">Password</label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={handleVIsible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-black border-2 pr-10 w-full"
              required
            />
            <div className="absolute right-2 cursor-pointer">
              {handleVIsible ? (
                <VisibilityIcon onClick={() => setHandleVIsible(false)} />
              ) : (
                <VisibilityOffIcon onClick={() => setHandleVIsible(true)} />
              )}
            </div>
          </div>
          <Button
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            {editIndex !== null ? "Update User" : "Add User"}
          </Button>
        </form>
      </Modals>
    </div>
  );
};
