import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type User = {
  name: string;
  email: string;
  phone: string;
  country: string;
  shipping: string;
  billing: string;
};

export const Customers = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [shipping, setShipping] = useState("");
  const [billing, setBilling] = useState("");

  const [addUser, setAddUser] = useState<User[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setShipping("");
    setBilling("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    const newUser: User = { name, email, phone, country, shipping, billing };

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
    setPhone(userToEdit.phone);
    setCountry(userToEdit.country);
    setShipping(userToEdit.shipping);
    setBilling(userToEdit.billing);
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
              <th className="w-1/5 text-center border border-gray-700">
                Phone
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Country
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Shipping Address
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Billing address
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
                  {item.phone}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.country}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.shipping}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.billing}
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
          <div className="flex flex-row gap-3">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-black border-2 ml-2"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border-black border-2 ml-2"
              required
            />
          </div>

          <div className="flex flex-row gap-3">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border-black border-2 ml-2"
              required
            />
            <label htmlFor="country">Country</label>
            <select
              id="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2 border-black border-2 ml-2"
              required
            >
              <option value="">Select a role</option>
              <option value="Graphics Designer">Canada</option>
              <option value="Web Developer">United States</option>
              <option value="Video Editor">United Kingdom</option>
              <option value="Animation">Australia</option>
              <option value="Content Writer">India</option>
              <option value="Content Writer">Bangladesh</option>
            </select>
          </div>
          <label htmlFor="shipping">Shipping Address</label>
          <input
            id="shiping"
            type="text"
            placeholder="Shipping Address"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
          <label htmlFor="billing">Billing Address</label>
          <input
            id="billing"
            type="text"
            placeholder="Billing Address"
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
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
