import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  id: string;
  amount: string;
  date: Date;
  status: string;
};

export const ClientPayment = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);

  // Input fields state
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [date] = useState(new Date());
  const [status, setStatus] = useState("");

  // Handle modal open/close
  const handleOpen = () => {
    setId(RandomId()); // Generate a new ID when opening the modal
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      id, // Use the state-stored ID
      amount,
      date: new Date(),
      status,
    };

    setAddUser([...addUser, newUser]); // Add user to the list
    handleClose();

    // Clear form fields and generate a new ID for the next submission
    setAmount("");
    setStatus("");
    setId(RandomId()); // Generate a new ID for the next submission
  };

  // Random Number generator
  const RandomId = () => {
    return (Math.random() * 1000).toFixed(0); // Generates a number between 0 and 999
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h1>Client Payment Report</h1>
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
        <h2 className="flex justify-between">All Invoices</h2>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">
                INVOICE ID
              </th>
              <th className="w-1/5 text-center border border-gray-700">DATE</th>
              <th className="w-1/5 text-center border border-gray-700">
                AMOUNT
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                STATUS
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
                  {item.date.toDateString()}
                  <br />
                  {item.date.toLocaleTimeString()}
                </td>

                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  ${item.amount}
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
          <h2>Create Task</h2>
          {/* Form Fields */}

          <label htmlFor="id">INVOICE ID</label>
          <input
            id="id"
            type="text"
            placeholder="Start Task"
            value={id} // Use the state-stored ID
            readOnly
            className="p-2 border-black border-2 w-full"
            required
          />

          <label htmlFor="date"> Date</label>
          <input
            id="date"
            type="text"
            placeholder=" Date"
            value={date.toLocaleString()}
            readOnly
            className="p-2 border-black border-2 w-full"
            required
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />

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

          <Button
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Add User
          </Button>
        </form>
      </Modals>
    </div>
  );
};
