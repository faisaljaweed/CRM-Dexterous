import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type User = {
  name: string;
  country: string;
  address: string;
  code: string;
  //   password: string;
};

export const Warehous = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");

  const [addUser, setAddUser] = useState<User[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setName("");
    setCountry("");
    setAddress("");
    setCode("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    const newUser: User = { name, country, address, code };

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
    setCountry(userToEdit.country);
    setAddress(userToEdit.address);
    setCode(userToEdit.code);
    setEditIndex(index);
    handleOpen(); // Open the modal with the user data
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2>Warehouse List</h2>
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
      </div>
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">
                Warehouse Name
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Address (lane)
              </th>
              <th className="w-1/5 text-center border border-gray-700">Role</th>
              <th className="w-1/5 text-center border border-gray-700">
                Warehouse Code
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.name}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.country}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.address}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.code}
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
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Address Lane"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />
          <label htmlFor="code">Warehouse Code</label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 border-black border-2  w-full"
            required
          >
            <option value="">Select a status</option>
            <option value="Bangladesh">Banglladesh</option>
            <option value="Canada">Canada</option>
            <option value="England">England</option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">USA</option>
            <option value="Spain">Spain</option>
            <option value="Itlay">Itlay</option>
            <option value="India">India</option>
          </select>
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
