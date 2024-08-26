import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

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
  // const deleteProduct = (indexToDelete: number) => {
  //   setAddUser((items) => items.filter((_, index) => index !== indexToDelete));
  // };

  // const handleEdit = (index: number) => {
  //   const userToEdit = addUser[index];
  //   setName(userToEdit.name);
  //   setEmail(userToEdit.email);
  //   setJoiningDate(userToEdit.joinDate);
  //   setGroup(userToEdit.group);
  //   setPlan(userToEdit.plan);
  //   setPayment(userToEdit.payment);
  //   setAmount(userToEdit.amount);
  //   setStatus(userToEdit.status);
  //   setEditIndex(index);
  //   setOpen(true);
  // };
  // Handle modal open/close
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
        <Button
          sx={{
            color: "white",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "white", color: "#1976d2" },
          }}
          onClick={handleOpen}
        >
          Add Product
        </Button>
      </div>
      <div>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">Name</th>
              <th className="w-1/5 text-center border border-gray-700">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Joining Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Group
              </th>
              <th className="w-1/5 text-center border border-gray-700">Plan</th>
              <th className="w-1/5 text-center border border-gray-700">
                Payment
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700">
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
              <input
                id="name"
                type="text"
                placeholder="Id"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
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
              <input
                id="plan"
                type="text"
                placeholder="Plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="payment">Pyment</label>
              <input
                id="payment"
                type="text"
                placeholder="Payment"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="status">Status</label>
              <input
                id="status"
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full"></div>
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
            Add Product
          </Button>
        </form>
      </Modals>
    </div>
  );
};
