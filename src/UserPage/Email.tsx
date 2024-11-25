import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
// import { useParams } from "react-router-dom";
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
          "http://localhost:8000/api/v1/tasks/show-task",
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

        console.log(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getUsers();
  }, []);
  // const { projectId } = useParams<{ projectId: string }>();
  // console.log("Extracted projectId:", projectId);
  // console.log("useParams:", useParams);
  // if (!projectId) {
  //   return <div>Error: Project ID is missing!</div>;
  // }
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
        `http://localhost:8000/api/v1/tasks/editTask/${editIndex._id}`,
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
      <div className="flex flex-wrap gap-3 overflow-auto h-96">
        {addUser.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col w-[25%] overflow-auto h-80 m-8 p-2 border-[3px] border-gray-400 rounded-lg"
            >
              <h4 className="text-[20px] font-bold pt-3 pb-3">{item.title}</h4>
              <p className="text-[14px] pb-3">{item.description}</p>
              <span className="text-[14px] pb-3 font-extrabold">
                {item.status}
              </span>
              <img src={item.project} className="w-48 h-48 " />
              <button
                onClick={() => handleEditClick(item)}
                className="mt-3 p-2 bg-green-400 text-white "
              >
                Edit
              </button>
              <Comment projectId={item._id} />
            </div>
          );
        })}
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
