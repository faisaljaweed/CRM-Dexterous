import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  id: string;
  topic: string; // Store the image URL or file path
  description: string;
  date: string;
  expiryDate: string;
  publishDate: string;
  status: string;
};

export const NoticeBoard = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // New state for tracking edit index

  // Input fields state
  const [id, setId] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [status, setStatus] = useState("");
  // Handle modal open/close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setId("");
    setTopic("");
    setDescription("");
    setDate("");
    setExpiryDate("");
    setPublishDate("");
    setStatus("");
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      id,
      topic,
      description,
      date,
      expiryDate,
      publishDate,
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
          <h2 className="text-xl">Notice Board</h2>
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
              <th className="w-1/5 text-center border border-gray-700">Id</th>
              <th className="w-1/5 text-center border border-gray-700">
                Topic
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Description
              </th>
              <th className="w-1/5 text-center border border-gray-700">Date</th>
              <th className="w-1/5 text-center border border-gray-700">
                Expiry Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Publish Date
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
                  {item.id}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.topic}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.description}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.date}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.expiryDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.publishDate}
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
              <label htmlFor="id">ID</label>
              <input
                id="id"
                type="text"
                placeholder="Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="topic">Topic</label>
              <input
                id="topic"
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="department">Description</label>
              <select
                id="department"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="text"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="expiry date">Expiry Date</label>
              <input
                id="expiry date"
                type="text"
                placeholder="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="publish Date">Publish Date</label>
              <input
                id="publish Date"
                type="text"
                placeholder="Publish Date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
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
