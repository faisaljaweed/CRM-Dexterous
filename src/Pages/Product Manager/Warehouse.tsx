import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

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
        <Buttons
          text="Add User"
          onClick={handleOpen}
          className="text-white bg-[#1976d2]"
        />
      </div>
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Warehouse Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Address (lane)
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Role
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Warehouse Code
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
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
          <Inputs
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <label htmlFor="address">Address</label>
          <Inputs
            id="address"
            type="text"
            placeholder="Address Lane"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />

          <label htmlFor="code">Warehouse Code</label>
          <Inputs
            id="code"
            type="text"
            placeholder="Warehouse Code"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
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
          <Buttons
            className="text-white bg-green-700 "
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals>
    </div>
  );
};
