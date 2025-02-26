import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";
type User = {
  id: string;
  account: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: string;
};

export const Payment = () => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState<User[]>([]);
  const [id, setId] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [editIndex] = useState<number | null>(null);
  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submit

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleClose();
    const newUser = { id, account, amount, issueDate, dueDate, status };
    setAdd([...add, newUser]);
    setId("");
    setAccount("");
    setAmount("");
    setIssueDate("");
    setDueDate("");
    setStatus("");
  };

  return (
    <div className="w-full">
      <Buttons
        text="Add User"
        onClick={handleOpen}
        className="text-white bg-[#1976d2]"
      />

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-700 mt-2">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                ID
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Issue Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Due Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {add.map((item, index) => (
              <tr key={index}>
                <td className="w-1/7 text-center text-[12px] border border-gray-700">
                  {item.id}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.account}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.amount}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.issueDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.dueDate}
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
          <label htmlFor="id">Id</label>
          <Inputs
            id="id"
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setId(e.target.value)
            }
          />

          <label htmlFor="account">Account</label>
          <Inputs
            id="account"
            type="text"
            placeholder="Account"
            value={account}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAccount(e.target.value)
            }
          />

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

          <label htmlFor="id">Issue Date</label>
          <Inputs
            id="issueDate"
            type="Date"
            placeholder="Issue Date"
            value={issueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIssueDate(e.target.value)
            }
          />

          <label htmlFor="dueDate">Due Date</label>
          <Inputs
            id="dueDate"
            type="Date"
            placeholder="dueDate"
            value={dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDueDate(e.target.value)
            }
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
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
            <option value="Canceled">Canceled</option>
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
