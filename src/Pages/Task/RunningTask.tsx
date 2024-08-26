import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  task: string;
  description: string;
  startDate: Date;
  deadline: string;
  assign: string;
  status: string;
};

export const RunnigTask = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);

  // Input fields state
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState("");
  const [assign, setAssign] = useState(""); // Set current date-time once, and make it fixed
  const [status, setStatus] = useState("");

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      task,
      description,
      startDate: new Date(),
      deadline,
      assign,
      status,
    };

    setAddUser([...addUser, newUser]); // Add user to the list
    handleClose();
    // Clear form fields
    setTask("");
    setDescription("");
    setDeadline("");
    setAssign("");
    setStatus("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h1>Running Task</h1>
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
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">
                Task Name{" "}
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Start Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Assing to
              </th>
              <th className="w-1/5 text-center border border-gray-700">Tag </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.task}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.description}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.startDate.toDateString()}
                  <br />
                  {item.startDate.toLocaleTimeString()}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.deadline}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.assign}
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

          <label htmlFor="task">Task Name</label>
          <input
            id="task"
            type="text"
            placeholder="Start Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />

          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={30}
            className="p-2 border-black border-2 w-full"
          />
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <label htmlFor="start date">Task Start Date</label>
              <input
                id="start date"
                type="text"
                placeholder="Task Start Date"
                value={startDate.toLocaleString()}
                readOnly
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="task deadlines">Task Deadlines</label>
              <input
                id="task deadlines"
                type="text"
                placeholder="task deadlines"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="assign to">Assign To</label>
              <input
                id="assign to"
                type="text"
                placeholder="assign to"
                value={assign}
                onChange={(e) => setAssign(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
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
            </div>
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
            Add User
          </Button>
        </form>
      </Modals>
    </div>
  );
};
