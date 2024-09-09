import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

type User = {
  id: string;
  name: string;
  email: string;
  payDate: string;
  amount: string;
  status: string;
};

export const SalaryGrade = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [payDate, setPayDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [addUser, setAddUser] = useState<User[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setId("");
    setName("");
    setEmail("");
    setPayDate("");
    setAmount("");
    setStatus("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    const newUser: User = {
      id,
      name,
      email,
      payDate,
      amount,
      status,
    };

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

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h2>Salary Gradet</h2>
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
                ID
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Pay Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status
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
                  {item.id}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.name}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.email}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.payDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.amount}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.status}
                </td>
                <td className="w-1/5 text-center border-gray-700">
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="id">ID</label>
              <Inputs
                id="id"
                type="number"
                placeholder="EMP ID"
                value={id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setId(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="employee name">Employee Name</label>
              <Inputs
                id="employee name"
                type="text"
                placeholder="Employee Nname"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
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
            <div className="flex flex-col w-full">
              <label htmlFor="status">Position</label>
              <Inputs
                id="status"
                type="text"
                placeholder="Position"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStatus(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="paydate">Pay Date</label>
              <Inputs
                id="paydate"
                type="date"
                placeholder="Pay Date"
                value={payDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayDate(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="amount">Amount </label>
              <Inputs
                id="amount"
                type="amount"
                placeholder="e.g. $750.00"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
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
