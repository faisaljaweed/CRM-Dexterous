import React, { useEffect, useState } from "react";
import { Modals } from "../../Components/Modal";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
type CommentProps = {
  projectId: string | undefined; // projectId can be string or undefined
};

interface Comment {
  _id: string;
  content: string;
  owner: {
    username: string; // assuming you want to display the owner's name
  };
}

type User = {
  title: string;
  description: string;
  assignTo: string;
  status: string;
  project: File;
  username: string;
};
type Task = {
  _id: string;
  title: string;
  description: string;
  assignTo: {
    username: string;
  };
  status: string;
  project: "";
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
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("");
  const [editIndex] = useState<number | null>(null);
  const [user, setUser] = useState<User[]>([]);
  const [task, setTask] = useState<Task[]>([]);
  const [totalProjects, setTotalProjects] = useState("");
  const [tasksChanged, setTasksChanged] = useState(false);

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const res = await axios.get(
          "http://localhost:8000/api/v1/tasks//getAllTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token here
            },
          }
        );
        setTask(res.data.data);
        // console.log("All Task", res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAllTask();
  }, []);

  const handledelete = async (index: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/tasks/deleteTask/${task[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      handleTaskChange();
      if (response.status === 200) {
        // Remove the deleted user from the state
        const updatedUsers = [...task];
        updatedUsers.splice(index, 1);
        setTask(updatedUsers);
        // toast.success("User deleted successfully");
      } else {
        // toast.error("Failed to delete user");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

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
        // console.log(res.data.data);
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/tasks/creat-task",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      handleTaskChange();
      if (response.status === 200) {
        toast.success("Project created successfully");
        console.log(response.data.data);
        // Add the new user from response data to the state
        setTask([...task, response.data.data]);
      }
      // console.log(response.data);
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

  useEffect(() => {
    const TotalProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const response = await axios.get(
          `http://localhost:8000/api/v1/tasks/totalNoofTask`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setTotalProjects(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    TotalProjects();
  }, [tasksChanged]);
  const handleTaskChange = async () => {
    // Logic to add or delete a task
    // After successfully adding or deleting, toggle tasksChanged
    setTasksChanged((prev) => !prev);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h2 className="font-bold text-[20px] text-white">
          Total Projects: {totalProjects}
        </h2>
        <Buttons
          text="Add Projects"
          onClick={handleOpen}
          className="text-white bg-blue-500 "
        />
      </div>
      <div className="">
        <div className=" flex flex-wrap gap-3 overflow-auto h-96">
          {task.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col w-[30%] pb-6 bg-gray-200 overflow-auto h-80   border-[3px] border-gray-400 rounded-lg"
              >
                {/* <div className="fixed bg-gray-700 py-2 px-[45px] rounded-lg">
                  <h2 className="text-start">Project Resources </h2>
                </div> */}
                <div className="flex justify-center items-center mt-2">
                  <button
                    onClick={() => handledelete(index)}
                    className="w-48 mb-2 bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex justify-center item-center  mt-2 mb-2">
                  <img src={item.project} alt="" className="w-56 h-56" />
                </div>
                <section className="pl-2 pr-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500">
                  <h1 className="text-[14px] font-bold pt-3 text-start">
                    Assign :{" "}
                    <span className="text-[14px] font-bold">
                      {" "}
                      {item.assignTo?.username}{" "}
                    </span>
                  </h1>

                  <h4 className="text-[14px] font-bold pt-3 pb-3 text-start">
                    <span className="font-bold"> Title:</span>
                    {item.title}
                  </h4>
                </section>
                <section className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500">
                  <p className="text-[14px] pb-3 text-start">
                    <span className="font-bold">Descriptiom :</span>{" "}
                    {item.description}
                  </p>

                  <span className="text-[14px]  font-extrabold">
                    Status : {item.status}
                  </span>
                </section>
                <ShowComment projectId={item._id} />
              </div>
            );
          })}
        </div>
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

// Commetn Section

const ShowComment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Check if the token exists
        if (!token) {
          console.error("Token is missing or undefined");
          return;
        }
        const response = await axios.get(
          `http://localhost:8000/api/v1/comment/getallcomment/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token here
            },
          }
        );
        if (response.data && Array.isArray(response.data.data)) {
          setComments(response.data.data); // Set the users array
          // setComments((prevComments) => [...prevComments, newComment]);
        } else {
          // console.error("User data is not an array:", response.data);
        }

        // console.log(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchComments();
  }, []);
  // Handle comment submission
  const handleDelete = (index: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }
      const response = axios.delete(
        `http://localhost:8000/api/v1/comment/deletecomment/${comments[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      console.log(response);
      setComments(comments.filter((_, i) => i !== index));
      // console.log(comments);
    } catch (error) {
      console.log(`Delete Functionality issue ${error}`);
    }
  };

  // http://localhost:8000/api/v1/comment/deletecomment/67489d356d0fd7cce226f6d4
  return (
    <div>
      <div>
        {comments.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500"
              // className="
              // border-2 border-black flex justify-start items-start flex-col pl-2 mt-2
              // "
            >
              <section className="flex justify-between">
                <p className="text-start text-blue-500 font-bold border-b-4 border-blue-500">
                  @{item.owner?.username}
                </p>
                <DeleteIcon
                  sx={{ color: "#3b82f6" }}
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
              </section>
              <p className="text-start font-thin">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowComment;

// Comment get Api
//http://localhost:8000/api/v1/comment/getallcomment/673b7d8f11f22978df0fbee0
