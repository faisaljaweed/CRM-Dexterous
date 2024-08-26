import { Button } from "@mui/material";
import { useState } from "react";
import { Modals } from "../../Components/Modal";
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
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">ID</th>
              <th className="w-1/5 text-center border border-gray-700">
                Account
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Issue Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Due Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
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
          <input
            id="id"
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
          <label htmlFor="account">Account</label>
          <input
            id="account"
            type="text"
            placeholder="Account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
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
          <label htmlFor="id">Issue Date</label>
          <input
            id="issueDate"
            type="Date"
            placeholder="Issue Date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="p-2 border-black border-2 ml-2"
            required
          />
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="Date"
            placeholder="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border-black border-2 ml-2"
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
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
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
