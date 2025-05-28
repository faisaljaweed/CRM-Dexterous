import React, { useEffect, useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Inputs } from "../../Components/Inputs";
import { Buttons } from "../../Components/Button";
import axios from "axios";
import { toast } from "react-toastify";

type User = {
  _id?: string;
  username: string;
  email: string;
  role: string;
  status: string;
  password: string;
};

export const People = () => {
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the user being edited

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [handleVisible] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [count, setCount] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit index on close
    setName("");
    setEmail("");
    setRole("");
    setStatus("");
    setPassword("");
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Check if the token exists
        if (!token) {
          console.error("Token is missing or undefined");
          return;
        }
        const response = await axios.get(
          "https://crm-backend-sage.vercel.appapi/v1/users/getAllUsers",
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
        // setAddUser(response.data); // Assuming response.data is the array of users
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Map data to match API structure
    const userData = {
      email,
      username,
      fullname: status, // Adjust this field as needed
      password,
      role,
    };

    try {
      if (editIndex !== null) {
        // Updating existing user
        const response = await axios.put(
          `https://crm-backend-sage.vercel.appapi/v1/users/updateUser/${addUser[editIndex]._id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("User updated successfully");

          // Update the user in the state with data from response
          const updatedUsers = [...addUser];
          updatedUsers[editIndex] = response.data.user; // use updated data from server
          setAddUser(updatedUsers);
        } else {
          toast.error("Failed to update user");
        }
      } else {
        // Adding new user
        const response = await axios.post(
          "https://crm-backend-sage.vercel.appapi/v1/users/signup",
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("User created successfully");
          console.log(response);
          // Add the new user from response data to the state
          setAddUser((prevUsers) => [...prevUsers, response.data.data]);
        }
      }

      handleClose(); // Close the modal after submission
    } catch (error) {
      toast.error("Error during signup");
      console.error("Error during signup:", error);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const response = await axios.delete(
        `https://crm-backend-sage.vercel.appapi/v1/users/deleteUser/${addUser[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Check if the delete request was successful
      if (response.status === 200) {
        // Remove the deleted user from the state
        const updatedUsers = [...addUser];
        updatedUsers.splice(index, 1);
        setAddUser(updatedUsers);
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const handleEdit = (index: number) => {
    const userToEdit = addUser[index];
    setName(userToEdit.username);
    setEmail(userToEdit.email);
    setRole(userToEdit.role);
    setStatus(userToEdit.status);
    setPassword(userToEdit.password);
    setEditIndex(index);
    handleOpen(); // Open the modal with the user data
  };
  useEffect(() => {
    const getCount = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const response = await axios.get(
          `https://crm-backend-sage.vercel.appapi/v1/users/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCount(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCount();
  });
  return (
    <div className="w-full">
      <section className="flex justify-between py-4">
        <Buttons
          onClick={handleOpen}
          className="px-6 py-2 bg-[#444ee7] rounded-lg text-white hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg"
          text="Add User"
        />
        <div>
          <h1 className="text-white text-xl font-bold">Users : {count}</h1>
        </div>
      </section>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <table className="min-w-full divide-y divide-blue-200 border border-blue-300 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-200">
            {Array.isArray(addUser) && addUser.length > 0 ? (
              addUser.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item?.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {item?.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item?.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : item?.role === "sales"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item?.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-1 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
                      aria-label="Edit user"
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1 rounded-md text-red-600 hover:bg-red-100 transition-colors"
                      aria-label="Delete user"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    No users found. Add your first user to get started.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 
      <div>
        <table className="w-full table-fixed border border-[#3b82f6]  mt-2">
          <thead>
            <tr>
              <th className="w-1/5 text-center border-4 border-[#3b82f6] text-white font-bold  text-[20px]">
                Name
              </th>
              <th className="w-1/5 text-center border-4 border-[#3b82f6] text-white font-bold  text-[20px]">
                Email
              </th>
              <th className="w-1/5 text-center border-4 border-[#3b82f6] text-white font-bold  text-[20px]">
                Role
              </th>
        
              <th className="w-1/12 text-center border-4 border-[#3b82f6] text-white font-bold  text-[20px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(addUser) && addUser.length > 0 ? (
              addUser.map((item, index) => (
                <tr key={index}>
                  <td className="w-1/5 text-start pl-2 text-[12px] border-2 border-[#3b82f6] text-white">
                    {item?.username}
                  </td>
                  <td className="w-1/5 text-start pl-2 text-[12px] border-2 border-[#3b82f6] text-white">
                    {item?.email}
                  </td>
                  <td className="w-1/5 text-start pl-2 text-[12px] border-2 border-[#3b82f6] text-white">
                    {item?.role}
                  </td>

                  <td className="w-1/12 text-center pl-2 border-2 border-[#3b82f6] text-white">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleDelete(index)}
                    />
                    <EditIcon
                      fontSize="small"
                      onClick={() => handleEdit(index)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      {/* <Modals open={open} handleClose={handleClose}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <Inputs
            id="name"
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <label htmlFor="email">Email</label>
          <Inputs
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          >
            <option value="">Select a role</option>
            <option value="Graphics Designer">Graphics Designer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Video Editor">Video Editor</option>
            <option value="Animation">Animation</option>
            <option value="Content Writer">Content Writer</option>
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
          </select>

          <label htmlFor="fullname">Full Name</label>
          <Inputs
            id="fullname"
            type="text"
            placeholder="Full Name"
            value={status}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStatus(e.target.value)
            }
          />

          <label htmlFor="password">Password</label>
          <div className="relative flex items-center">
            <Inputs
              id="password"
              type={handleVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <div className="absolute right-2 cursor-pointer">
              {handleVisible ? (
                <VisibilityIcon onClick={() => setHandleVisible(false)} />
              ) : (
                <VisibilityOffIcon onClick={() => setHandleVisible(true)} />
              )}
            </div>
          </div>

          <Buttons
            className="text-white bg-[#1976d2]"
            text={editIndex !== null ? "Update User" : "Add User"}
          />
        </form>
      </Modals> */}
      <Modals open={open} handleClose={handleClose}>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {editIndex !== null ? "Edit User" : "Add New User"}
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <Inputs
                  id="name"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  // required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <Inputs
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  // required
                />
              </div>

              {/* Role Field */}
              <div className="space-y-1">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Graphics Designer">Graphics Designer</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Animation">Animation</option>
                  <option value="Content Writer">Content Writer</option>
                  <option value="admin">Admin</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              {/* Full Name Field */}
              <div className="space-y-1">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Inputs
                  id="fullname"
                  type="text"
                  placeholder="Enter full name"
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStatus(e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1 md:col-span-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {editIndex !== null ? "New Password" : "Password"}{" "}
                  {editIndex === null && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div className="relative">
                  <Inputs
                    id="password"
                    type={handleVisible ? "text" : "password"}
                    placeholder={
                      editIndex !== null
                        ? "Leave blank to keep current"
                        : "Enter password"
                    }
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                    // required={editIndex === null}
                  />
                  {/* <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                    onClick={() => setHandleVisible(!handleVisible)}
                  >
                    {handleVisible ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </button> */}
                </div>
                {editIndex !== null && (
                  <p className="text-xs text-gray-500 mt-1">
                    Leave password field empty to keep the current password
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Buttons
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                text="Cancel"
              />
              <Buttons
                type="submit"
                className="px-6 py-2 bg-[#444ee7] rounded-lg text-white hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg"
                text={editIndex !== null ? "Update User" : "Add User"}
              />
            </div>
          </form>
        </div>
      </Modals>
    </div>
  );
};
