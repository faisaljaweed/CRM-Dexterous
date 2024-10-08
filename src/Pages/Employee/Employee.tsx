import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

type User = {
  name: string;
  email: string; // Store the image URL or file path
  department: string;
  phone: string;
  address: string;
  verified: string;
  designation: string;
};

export const Employee = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // New state for tracking edit index

  // Input fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState("");
  const deleteProduct = (indexToDelete: number) => {
    setAddUser((items) => items.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index: number) => {
    const userToEdit = addUser[index];
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setDepartment(userToEdit.department);
    setPhone(userToEdit.phone);
    setVerified(userToEdit.verified);
    setAddress(userToEdit.address);
    setDesignation(userToEdit.designation);
    setEditIndex(index);
    setOpen(true);
  };
  // Handle modal open/close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setName("");
    setEmail("");
    setDepartment("");
    setPhone("");
    setVerified("");
    setAddress("");
    setDesignation("");
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      name,
      email,
      department,
      phone,
      verified,
      address,
      designation,
    };

    if (editIndex !== null) {
      // Update existing item
      const updatedUsers = [...addUser];
      updatedUsers[editIndex] = newUser;
      setAddUser(updatedUsers);
    } else {
      // Add new item
      setAddUser([...addUser, newUser]);
    }

    handleClose();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <div className="flex justify-start flex-col items-start">
          <h2 className="text-xl">Employee</h2>
          <p>Department Member's Information Details </p>
        </div>
        <Buttons
          text="Add User"
          onClick={handleOpen}
          className="text-white bg-[#1976d2]"
        />
      </div>
      <div>
        <h2 className="flex justify-between">Employee</h2>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Department
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Designation
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Phone
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Address(lane)
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Actions
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
                  {item.email}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.department}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.designation}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.phone}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.address}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h2>Project Expenses</h2>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="employee">Employee</label>
              <Inputs
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
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
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="">Select Department</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="graphics">Graphics</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="designation">Designation</label>
              <Inputs
                id="designation"
                type="text"
                placeholder="Software Engineer"
                value={designation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDesignation(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
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
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <Inputs
                id="address"
                type="address"
                placeholder="Address"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </div>
          </div>

          <Buttons
            className="text-white bg-green-700 "
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals>
    </div>
  );
};
