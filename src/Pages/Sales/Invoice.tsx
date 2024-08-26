import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  amount: string;
  address: string;
  invoicedate: Date;
  dueDate: string;
  status: string;
  contact: string;
};

export const Invoice = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);

  // Input fields state
  const [id, setId] = useState<string>("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [invoicedate] = useState(new Date()); // Set current date-time once, and make it fixed
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();
  const handleEditClick = (user: User) => {
    navigate(`/about/${user.id}`, { state: user });
  };

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      id,
      name,
      amount,
      address,
      invoicedate: new Date(), // Capture the current date-time at submission
      dueDate,
      status,
      contact,
    };

    setAddUser([...addUser, newUser]); // Add user to the list
    handleClose();
    // Clear form fields
    setId("");
    setName("");
    setAmount("");
    setAddress("");
    setDueDate("");
    setStatus("");
    setContact("");
  };

  return (
    <div className="w-full">
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/6 text-center border border-gray-700">ID </th>
              <th className="w-1/3 text-center border border-gray-700">
                Project Name
              </th>
              <th className="w-1/6 text-center border border-gray-700">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Address
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Invoice Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Due Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status
              </th>
              <th className="w-1/6 text-center border border-gray-700">
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
                  {item.amount}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.address}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.invoicedate.toDateString()}
                  <br />
                  {item.invoicedate.toLocaleTimeString()}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.dueDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.status}
                </td>
                <td className="w-1/5 text-center border-gray-700">
                  <MoreHorizIcon
                    fontSize="small"
                    onClick={() => handleEditClick(item)}
                  />
                  {/* Other icons and actions here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h2>Add Invoices</h2>
          {/* Form Fields */}
          <div className="flex gap-2 flex-row">
            <div className="flex flex-col">
              <label htmlFor="order_id">Order ID</label>
              <input
                id="order_id"
                type="number"
                placeholder="order id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="p-2 border-black border-2 ml-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">Project Name</label>
              <input
                id="name"
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border-black border-2 ml-2"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 flex-row">
            <div className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border-black border-2 ml-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 border-black border-2 ml-2"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 flex-row">
            <div className="flex flex-col">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                id="invoiceDate"
                type="text"
                placeholder="Invoice Date"
                value={invoicedate.toLocaleString()} // Show fixed date
                readOnly // Make this field readonly
                className="p-2 border-black border-2 ml-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border-black border-2 ml-2"
                required
              />
            </div>
          </div>
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="number"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            Add User
          </Button>
        </form>
      </Modals>
    </div>
  );
};
