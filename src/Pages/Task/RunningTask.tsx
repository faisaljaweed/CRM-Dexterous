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
  createdAt?: string; // Add createdAt property, optional if not always present
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
          "https://crm-backend-sage.vercel.appapi/v1/tasks/getAllTasks",
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
        `https://crm-backend-sage.vercel.appapi/v1/tasks/deleteTask/${task[index]._id}`,
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
          "https://crm-backend-sage.vercel.appapi/v1/users/getAllUsers",
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
        "https://crm-backend-sage.vercel.appapi/v1/tasks/creat-task",
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
          `https://crm-backend-sage.vercel.appapi/v1/tasks/totalNoofTask`,
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
        <h2 className="font-bold text-xl text-white">
          Projects: {totalProjects}
        </h2>
        <Buttons
          text="Add Projects"
          onClick={handleOpen}
          className="text-white bg-[#464de7] "
        />
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {task.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-400"
              style={{ maxHeight: "400px" }}
            >
              {/* Image Preview */}
              {item.project && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={item.project}
                    alt="Task preview"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handledelete(index)}
                      className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                      aria-label="Delete task"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Task Details */}
              <div className="p-4 flex-1 flex flex-col overflow-y-auto">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {item.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Assigned to:{" "}
                      <span className="font-medium">
                        {item.assignTo?.username}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <ShowComment projectId={item._id} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {task.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No tasks found
            </h3>
            <p className="mt-1 text-gray-500">
              Create your first task to get started
            </p>
          </div>
        )}
      </div>
      {/* <div className="">
        <div className=" flex flex-wrap gap-3 overflow-auto h-96">
          {task.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col w-[30%] pb-6 bg-gray-200 overflow-auto h-80   border-[3px] border-gray-400 rounded-lg"
              >
             
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
      </div> */}
      {/* <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h2>Create Task</h2> */}
      {/* Form Fields */}

      {/* <label htmlFor="task">Task Name</label>
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
            <div className="flex flex-col"> */}
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
      {/* <label htmlFor="project">Project</label>
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
            </div> */}
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
      {/* </div>
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
      </Modals> */}
      <Modals open={open} handleClose={handleClose}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-xl overflow-scroll h-[90vh]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {editIndex !== null ? "Update Task" : "Create New Task"}
              </h2>
              <p className="text-gray-600 text-sm">
                {editIndex !== null
                  ? "Modify your task details"
                  : "Fill in the task information below"}
              </p>
            </div>

            {/* Task Name */}
            <div className="space-y-2">
              <label
                htmlFor="task"
                className="block text-sm font-medium text-gray-700"
              >
                Task Name <span className="text-red-500">*</span>
              </label>
              <Inputs
                id="task"
                type="text"
                placeholder="Enter task name"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                // required
              />
            </div>

            {/* Task Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Describe the task details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label
                htmlFor="project"
                className="block text-sm font-medium text-gray-700"
              >
                Attach Files
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all rounded-lg cursor-pointer bg-white hover:bg-blue-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      {project
                        ? project.name
                        : "PDF, DOCX, or image files (MAX. 5MB)"}
                    </p>
                  </div>
                  <Inputs
                    id="project"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) setProject(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Assign To and Status - Responsive Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assign To */}
              <div className="space-y-2">
                <label
                  htmlFor="assign"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assign To <span className="text-red-500">*</span>
                </label>
                <select
                  id="assign"
                  value={assign}
                  onChange={(e) => setAssign(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select team member</option>
                  {user.map((item, index) => (
                    <option key={index} value={item.username} className="py-1">
                      {item.username}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active" className="text-green-600">
                    Active
                  </option>
                  <option value="Pending" className="text-yellow-600">
                    Pending
                  </option>
                  <option value="Canceled" className="text-red-600">
                    Canceled
                  </option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-2">
              <Buttons
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                text="Cancel"
              />
              <Buttons
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
                text={editIndex !== null ? "Update Task" : "Create Task"}
              />
            </div>
          </form>
        </div>
      </Modals>
    </div>
  );
};

// Commetn Section

// import { useEffect, useState } from "react";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ShowComment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");

        if (!token) {
          toast.error("Please login to view comments");
          return;
        }

        const response = await axios.get(
          `https://crm-backend-sage.vercel.appapi/v1/comment/getallcomment/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setComments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchComments();
  }, [projectId]);

  const handleDelete = async (index: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to delete comments");
        return;
      }

      await axios.delete(
        `https://crm-backend-sage.vercel.appapi/v1/comment/deletecomment/${comments[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment deleted successfully");
      setComments(comments.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4 p-2">
      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
        {isLoading && comments.length === 0 ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No comments yet.</div>
        ) : (
          comments.map((item, index) => (
            <div
              key={item._id}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100  transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="pt-1">
                  <AccountCircleIcon
                    className="text-gray-400"
                    fontSize="medium"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      @{item.owner?.username || "Anonymous"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete comment"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-700 text-sm">{item.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowComment;

// Comment get Api
//https://crm-backend-sage.vercel.appapi/v1/comment/getallcomment/673b7d8f11f22978df0fbee0
