import React, { useEffect, useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";
import axios from "axios";

type User = {
  title: string;
  description: string;
  // startDate: Date;
  // deadline: string;
  assignTo: string;
  status: string;
  project: File;
  username: string;
};

export const RunnigTask = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [project, setProject] = useState<File | null>(null);
  // Input fields state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState(new Date());

  // const [deadline, setDeadline] = useState("");
  const [assign, setAssign] = useState(""); // Set current date-time once, and make it fixed
  const [status, setStatus] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Check if the token exists
        if (!token) {
          console.error("Token is missing or undefined");
          return;
        }
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token here
            },
          }
        );
        setUser(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchUser();
  }, []);
  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!project) {
      console.log("Error: Project file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("project", project); // Attach the file
    formData.append("assignTo", assign);
    formData.append("status", status);
    formData.append("username", assign); // Assuming assign is also the username

    // const newUser: User = {
    //   title,
    //   description,
    //   // startDate: new Date(),
    //   project: project as File,
    //   // deadline,
    //   assignTo: assign,
    //   status,
    //   username: assign,
    // };
    try {
      const response = axios.post(
        "http://localhost:8000/api/v1/tasks/creat-task",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log((await response).data);
    } catch (error) {
      console.log("Error", error);
    }
    // setAddUser([...addUser, newUser]); // Add user to the list
    setAddUser([
      ...addUser,
      {
        title,
        description,
        project,
        assignTo: assign,
        status,
        username: assign,
      },
    ]);
    handleClose();
    // Clear form fields
    setTitle("");
    setDescription("");
    // setDeadline("");
    setAssign("");
    setStatus("");
  };

  // axios
  //   .post("http://localhost:8000/api/v1/tasks/creat-task")
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));
  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h1>Running Task</h1>
        <Buttons
          text="Add User"
          onClick={handleOpen}
          className="text-white bg-[#1976d2]"
        />
      </div>
      <div className="">
        <table className="w-full table-fixed border border-gray-700 text-[12px]">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Task Name{" "}
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Description
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Project
              </th>
              {/* <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Start Date
              </th> */}
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Assing to
              </th>
              {/* <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Tag{" "}
              </th> */}
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status{" "}
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.title}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.description}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.project}
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
                  {item.assignTo}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h2>Create Task</h2>
          {/* Form Fields */}

          <label htmlFor="task">Task Name</label>
          <Inputs
            id="task"
            type="text"
            placeholder="Start Task"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
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
              {/* <label htmlFor="start date">Task Start Date</label>
              <input
                id="start date"
                type="text"
                placeholder="Task Start Date"
                value={startDate.toLocaleString()}
                readOnly
                className="p-2 border-black border-2 w-full"
                required
              /> */}
              <label htmlFor="project">Project</label>
              <Inputs
                id="project"
                type="file"
                placeholder="project"
                // value={project}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setProject(e.target.files[0]);
                  }
                }}
              />
            </div>
            {/* <div className="flex flex-col">
              <label htmlFor="task deadlines">Task Deadlines</label>
              <Inputs
                id="task deadlines"
                type="text"
                placeholder="task deadlines"
                value={deadline}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeadline(e.target.value)
                }
              />
            </div> */}
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="assign to">Assign To</label>
              <select
                id="assign to"
                value={assign}
                onChange={(e) => setAssign(e.target.value)}
                className="p-2 border-black border-2 w-full"
                required
              >
                <option value="">Select a user</option>
                {user.map((item, index) => (
                  <option key={index} value={item.username}>
                    {item.username}
                  </option>
                ))}
              </select>
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

          <Buttons
            className="text-white bg-green-700 "
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals>
    </div>
  );
};
