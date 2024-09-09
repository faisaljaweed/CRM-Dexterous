import React, { useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";

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
                Id
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Topic
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Description
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Expiry Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Publish Date
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
              <Inputs
                id="id"
                type="number"
                placeholder="Id"
                value={id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setId(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="topic">Topic</label>
              <Inputs
                id="topic"
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="department">Task Description</label>
              <textarea
                className="w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 border-black border-2 "
                cols={30}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="date">Date</label>
              <Inputs
                id="date"
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="expiry date">Expiry Date</label>
              <Inputs
                id="expiry date"
                type="date"
                placeholder="Expiry Date"
                value={expiryDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setExpiryDate(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="publish Date">Publish Date</label>
              <Inputs
                id="publish Date"
                type="date"
                placeholder="Publish Date"
                value={publishDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPublishDate(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="status">Status</label>
              <select
                id="department"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="status">Status</option>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
                <option value="Delay">Delay</option>
              </select>
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
