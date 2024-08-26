import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  project: string;
  category: string; // Store the image URL or file path
  startDate: string;
  targetDate: string;
  client: string;
  newClient: string;
  email: string;
  number: string;
  status: string;
};

export const Project = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // New state for tracking edit index

  // Input fields state
  const [project, setProject] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [client, setClient] = useState("");
  const [newClient, setNewClient] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const deleteProduct = (indexToDelete: number) => {
    setAddUser((items) => items.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index: number) => {
    const userToEdit = addUser[index];
    setProject(userToEdit.project);
    setCategory(userToEdit.category);
    setStartDate(userToEdit.startDate);
    setTargetDate(userToEdit.targetDate);
    setClient(userToEdit.client);
    setNewClient(userToEdit.newClient);
    setEmail(userToEdit.email);
    setNumber(userToEdit.number);
    setStatus(userToEdit.status);
    setEditIndex(index);
    setOpen(true);
  };
  // Handle modal open/close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setProject("");
    setCategory("");
    setStartDate("");
    setTargetDate("");
    setClient("");
    setNewClient("");
    setEmail("");
    setNumber("");
    setStatus("");
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      project,
      category,
      startDate,
      targetDate,
      client,
      newClient,
      email,
      number,
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
          <h2 className="text-xl">Projects</h2>
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
              <th className="w-1/5 text-center border border-gray-700">
                Project Name
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Project Category
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Starting Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Target Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Client
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.project}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.category}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.startDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.targetDate}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.client}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.email}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                  <button onClick={() => handleEdit(index)}>Edit</button>
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
              <label htmlFor="project">Project Name</label>
              <input
                id="project"
                type="text"
                placeholder="Project Name"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="category">Project Categoryt</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="category">Category</option>
                <option value="web development">Web Development</option>
                <option value="CRM">CRM</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="startDate">Starting Date</label>
              <input
                id="startDate"
                type="text"
                placeholder="Starting Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="targetDate">Target Date</label>
              <input
                id="targetDate"
                type="text"
                placeholder="Target Date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="client">Client</label>
              <input
                id="client"
                type="text"
                placeholder="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="number">Phone Number</label>
              <input
                id="number"
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Emaiil"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="">Project Status</option>
                <option value="in Progress">In Progres</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="Not Started">Not Started</option>
                <option value="cancelled">Cancelled</option>
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
            Add Product
          </Button>
        </form>
      </Modals>
    </div>
  );
};