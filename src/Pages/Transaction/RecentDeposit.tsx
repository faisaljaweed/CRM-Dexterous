import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

type User = {
  name: string;
  depositDate: string;
  account: string;
  accountNumber: string;
  transactionId: string;
  amount: string;
};

export const RecentTransaction = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [name, setName] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [account, setAccount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  // const [password, setPassword] = useState("");
  const [transactionId, setTraansactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [addUser, setAddUser] = useState<User[]>([]);
  // const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setName("");
    setDepositDate("");
    setAccount("");
    setAccountNumber("");
    setTraansactionId("");
    setAmount("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    const newUser: User = {
      name,
      depositDate,
      account,
      accountNumber,
      transactionId,
      amount,
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
        <h2>Deposit</h2>
        <Buttons
          text="Add User"
          onClick={handleOpen}
          className="text-white bg-[#1976d2]"
        />
      </div>

      <div className="">
        <table className="w-full table-fixed border border-gray-700 mt-2">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account Number
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Transaction ID
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Amount
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
                  {item.depositDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.account}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.accountNumber}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.transactionId}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.amount}
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
              <label htmlFor="name">Name</label>
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
              <label htmlFor="deposite date">Deposite Date</label>
              <Inputs
                id="deposite date"
                type="text"
                placeholder="Deposite Date"
                value={depositDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDepositDate(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="account">Account</label>
              <select
                id="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="">Default Option</option>
                <option value="paypal">Paypal</option>
                <option value="payoneer">Payoneer</option>
                <option value="nexuspay">NexusPay</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="account number">Account Number</label>
              <Inputs
                id="account number"
                type="text"
                placeholder="e.g. 026002532"
                value={accountNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAccountNumber(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="transaction id">Transaction ID</label>
              <Inputs
                id="transaction id"
                type="text"
                placeholder="e.g. 34522323MN340LP1F"
                value={transactionId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTraansactionId(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="amount">Amount </label>
              <Inputs
                id="amount"
                type="text"
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
