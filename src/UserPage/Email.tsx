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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {addUser.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-400"
            style={{ maxHeight: "400px" }}
          >
            <div className=" h-48 bg-gray-100 overflow-hidden">
              <img
                src={item.project}
                alt="Task preview"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col overflow-y-auto">
              <section className="flex items-center gap-2 mb-2">
                <h4 className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Title : {item.title}
                </h4>
              </section>
              <section className="flex items-center gap-2 mb-2">
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  <span className="font-bold">Description : </span>{" "}
                  {item.description}
                </p>
              </section>
              <section className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {item.status}
                </span>
              </section>

              <button
                onClick={() => handleEditClick(item)}
                className="flex justify-center items-center mt-2 bg-[#444ee7] text-white"
              >
                Edit
              </button>
              <Comment projectId={item._id} />
            </div>
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
