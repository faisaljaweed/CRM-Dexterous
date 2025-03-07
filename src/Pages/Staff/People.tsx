import React, { useEffect, useState } from "react";
import { Modals } from "../../Components/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
  const [handleVisible, setHandleVisible] = useState(false);
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
          "https://crm-backend-sage.vercel.app/api/v1/users/getAllUsers",
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
          `https://crm-backend-sage.vercel.app/api/v1/users/updateUser/${addUser[editIndex]._id}`,
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
          "https://crm-backend-sage.vercel.app/api/v1/users/signup",
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
        `https://crm-backend-sage.vercel.app/api/v1/users/deleteUser/${addUser[index]._id}`,
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
          `https://crm-backend-sage.vercel.app/api/v1/users/count`,
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
      <section className="flex justify-between">
        <Buttons
          onClick={handleOpen}
          className="text-white bg-[#3b82f6] "
          text="Add User"
        />
        <div>
          <h1 className="text-white text-[30px]">Total Users : {count}</h1>
        </div>
      </section>

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
              {/* <th className="w-1/5 text-center border border-[#3b82f6] text-white font-bold  text-[12px]">
                Full Name
              </th> */}
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
      </div>

      <Modals open={open} handleClose={handleClose}>
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
      </Modals>
    </div>
  );
};
