import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
type User = {
  _id?: string;
  title: string;
  description: string;
  project: string;
  status: string;
  // password: string;
};
const Emails = () => {
  const [addUser, setAddUser] = useState<User[]>([]);
  const [status, setStatus] = useState("");
  const [editIndex, setEditIndex] = useState<User | null>(null);
  const [newProject, setNewProject] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Token is missing or undefined");
          return;
        }
        const response = await axios.get(
          "https://crm-backend-sage.vercel.app/api/v1/tasks/show-task",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token here
            },
          }
        );
        if (response.data && Array.isArray(response.data.data)) {
          setAddUser(response.data.data); // Set the users array
        } else {
          console.error("User data is not an array:", response.data);
        }

        // console.log(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getUsers();
  }, []);
  const handleEditClick = (task: User) => {
    setEditIndex(task);
    setStatus(task.status);
    setNewProject(task.project);
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!editIndex?._id) return;
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token is missing or undefined");
        return;
      }

      const response = await axios.patch(
        `https://crm-backend-sage.vercel.app/api/v1/tasks/editTask/${editIndex._id}`,
        {
          project: newProject,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      // Update State
      setAddUser((prev) =>
        prev.map((task) =>
          task._id === editIndex._id
            ? { ...task, project: newProject, status: status }
            : task
        )
      );

      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto h-96">
        {addUser.map((item, index) => (
          <div
            key={index}
            className="flex flex-col pb-6 bg-gray-200 overflow-auto h-80 border-[3px] border-gray-400 rounded-lg"
          >
            <section className="pl-2 pr-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500">
              <h4 className="text-[20px] font-bold pt-3 pb-3 text-start">
                Title : {item.title}
              </h4>
            </section>
            <section className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500">
              <p className="text-[14px] pb-3 text-start">
                <span className="font-bold">Description : </span>{" "}
                {item.description}
              </p>
            </section>
            <section className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500">
              <span className="text-[14px] pb-3 font-extrabold">
                {item.status}
              </span>
            </section>
            <div className="flex justify-center item-center mt-2 mb-2">
              <img src={item.project} className="w-48 h-48" />
            </div>

            <button
              onClick={() => handleEditClick(item)}
              className="flex justify-center items-center mt-2"
            >
              Edit
            </button>
            <Comment projectId={item._id} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            {/* Project Input */}
            <label className="block mb-2">Project Image URL:</label>
            <input
              id="project"
              type="file"
              placeholder="project"
              // value={project}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setNewProject(e.target.files[0].name);
                }
              }}
            />
            {/* <input
              type=""
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            /> */}

            {/* Status Input */}
            <label className="block mb-2">Status:</label>
            <select
              name=""
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">in Progress</option>
              <option value="completed">Completed</option>
            </select>
            {/* <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            /> */}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="p-2 bg-gray-400 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Emails;
