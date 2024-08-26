import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  budgetNo: string;
  invoiceId: string;
  description: string;
  date: Date;
  amount: string;
  status: string;
};

export const ExpenseManagement = () => {
  const generateInvoiceId = () => {
    const prefix = "#";
    const suffix = "01";

    // Generate a random number between 10000 and 99999
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();

    // Generate two random lowercase letters
    const randomLetters = Array(2)
      .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
      .join("");

    return `${prefix}${randomNumber}${randomLetters}${suffix}`;
  };

  // Example usage

  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);

  // Input fields state
  const [budgetNo, setBudgetNo] = useState("");
  const [date] = useState(new Date());
  const [invoiceId, setInvoiceId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // Handle modal open/close
  const handleOpen = () => {
    setBudgetNo(RandomId()); // Generate a new ID when opening the modal
    setInvoiceId(generateInvoiceId());
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      budgetNo, // Use the state-stored ID
      invoiceId,
      date: new Date(),
      status,
      description,
      amount,
    };

    setAddUser([...addUser, newUser]); // Add user to the list
    handleClose();

    // Clear form fields and generate a new ID for the next submission
    setAmount("");
    setDescription("");
    setStatus("");
    setBudgetNo(RandomId()); // Generate a new ID for the next submission
    setInvoiceId(generateInvoiceId());
  };

  // Random Number generator
  const RandomId = () => {
    return (Math.random() * 1000).toFixed(0); // Generates a number between 0 and 999
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h2 className="text-xl">Expense Management</h2>
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
        <h2 className="flex justify-between">Project Expenses</h2>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">
                Budget No.
              </th>
              <th className="w-1/5 text-center border border-gray-700">DATE</th>
              <th className="w-1/5 text-center border border-gray-700">
                Invoice ID
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Description
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
                  {item.budgetNo}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.date.toDateString()}
                  <br />
                  {item.date.toLocaleTimeString()}
                </td>

                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.invoiceId}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.description}
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
          {/* Form Fields */}
          <div className="flex flex-row gap-2">
            <div>
              <label htmlFor="budget">Budget No</label>
              <input
                id="budget"
                type="text"
                placeholder="Budget No"
                value={budgetNo} // Use the state-stored ID
                readOnly
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div>
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
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div>
              <label htmlFor="invoice">Invoice Id</label>
              <input
                id="invoice"
                type="text"
                placeholder="Invoice Id"
                value={invoiceId}
                readOnly
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
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
