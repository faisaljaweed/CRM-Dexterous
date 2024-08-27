import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

type User = {
  name: string;
  email: string; // Store the image URL or file path
  joinDate: string;
  group: string;
  plan: string;
  payment: string;
  amount: string;
  status: string;
};

export const Subscription = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // New state for tracking edit index

  // Input fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoiningDate] = useState("");
  const [group, setGroup] = useState("");
  const [plan, setPlan] = useState("");
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setName("");
    setEmail("");
    setJoiningDate("");
    setGroup("");
    setPlan("");
    setPayment("");
    setAmount("");
    setStatus("");
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      name,
      email,
      joinDate,
      group,
      plan,
      payment,
      amount,
      status,
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
          <h2 className="text-xl">Subscription List</h2>
        </div>
        <Buttons
          text="Add User"
          onClick={handleOpen}
          className="text-white bg-[#1976d2]"
        />
      </div>
      <div>
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
                Joining Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Group
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Plan
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Payment
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status
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
                  {item.joinDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.group}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.plan}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.payment}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.amount}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.status}
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
              <label htmlFor="name">Name</label>
              <Inputs
                id="name"
                type="text"
                placeholder="Id"
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
                type="text"
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
              <label htmlFor="joinDate">Joining Date</label>
              <select
                id="joindate"
                value={joinDate}
                onChange={(e) => setJoiningDate(e.target.value)}
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
              <label htmlFor="plan">Plan</label>
              <Inputs
                id="plan"
                type="text"
                placeholder="Plan"
                value={plan}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlan(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="payment">Pyment</label>
              <Inputs
                id="payment"
                type="text"
                placeholder="Payment"
                value={payment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayment(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="amount">Amount</label>
              <Inputs
                id="amount"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="status">Status</label>
              <Inputs
                id="status"
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStatus(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full"></div>
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
