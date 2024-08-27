import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

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
      <Buttons
        text="Add User"
        onClick={handleOpen}
        className="text-white bg-[#1976d2]"
      />

      <div className="">
        <table className="w-full table-fixed border border-gray-700 mt-2">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Phone
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Country
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Shipping Address
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Billing address
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
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
            <Inputs
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <label htmlFor="email">Email</label>
            <Inputs
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="flex flex-row gap-3">
            <label htmlFor="phone">Phone</label>
            <Inputs
              id="phone"
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />

            <label htmlFor="country">Country</label>
            <select
              id="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2 border-black border-2 ml-2 w-full"
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
          <Inputs
            id="shiping"
            type="text"
            placeholder="Shipping Address"
            value={shipping}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setShipping(e.target.value)
            }
          />

          <label htmlFor="billing">Billing Address</label>
          <Inputs
            id="billing"
            type="text"
            placeholder="Billing Address"
            value={billing}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBilling(e.target.value)
            }
          />

          <Buttons
            className="text-white bg-green-700 "
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals>
    </div>
  );
};
