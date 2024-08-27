import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const navigate = useNavigate();

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
      <Buttons
        text="Add User"
        onClick={handleOpen}
        className="text-white bg-[#1976d2]"
      />

      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/6 text-center border border-gray-700 text-[12px]">
                ID{" "}
              </th>
              <th className="w-1/3 text-center border border-gray-700 text-[12px]">
                Project Name
              </th>
              <th className="w-1/6 text-center border border-gray-700 text-[12px]">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Address
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Invoice Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Due Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status
              </th>
              <th className="w-1/6 text-center border border-gray-700 text-[12px]">
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
                  <MoreHorizIcon fontSize="small" />
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
              <Inputs
                id="order_id"
                type="number"
                placeholder="order id"
                value={id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setId(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">Project Name</label>
              <Inputs
                id="name"
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-2 flex-row">
            <div className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <Inputs
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <Inputs
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
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
              <Inputs
                id="dueDate"
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDueDate(e.target.value)
                }
              />
            </div>
          </div>
          <label htmlFor="contact">Contact</label>
          <Inputs
            id="contact"
            type="number"
            placeholder="Contact"
            value={contact}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContact(e.target.value)
            }
          />

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

          <Buttons
            className="text-white bg-green-700 "
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals>
    </div>
  );
};
