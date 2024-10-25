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
          "http://localhost:8000/api/v1/users/getAllUsers",
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
          `http://localhost:8000/api/v1/users/updateUser/${addUser[editIndex]._id}`,
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
          updatedUsers[editIndex] = response.data; // use updated data from server
          setAddUser(updatedUsers);
        } else {
          toast.error("Failed to update user");
        }
      } else {
        // Adding new user
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/signup",
          userData
        );

        if (response.status === 201) {
          toast.success("User created successfully");

          // Add the new user from response data to the state
          setAddUser((prevUsers) => [...prevUsers, response.data]);
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
        `http://localhost:8000/api/v1/users/deleteUser/${addUser[index]._id}`,
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

  return (
    <div className="w-full">
      <Buttons
        onClick={handleOpen}
        className="text-white bg-[#1976d2] "
        text="Add User"
      />

      <div>
        <table className="w-full table-fixed border border-gray-700 mt-2">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Email
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Role
              </th>
              {/* <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Full Name
              </th> */}
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(addUser) && addUser.length > 0 ? (
              addUser.map((item, index) => (
                <tr key={index}>
                  {/* <td className="  flex justify-start items-center text-[12px]  gap-2  border border-gray-700 ">
                    <Avatar className="flex items-center justify-center  border border-gray-700">
                      {item.name.charAt(0)}
                    </Avatar>
                    {item.name}
                  </td> */}
                  <td className="w-1/5 text-center text-[12px] border border-gray-700">
                    {item.username}
                  </td>
                  <td className="w-1/5 text-center text-[12px] border border-gray-700">
                    {item.email}
                  </td>
                  <td className="w-1/5 text-center text-[12px] border border-gray-700">
                    {item.role}
                  </td>
                  {/* <td className="w-1/5 text-center text-[12px] border border-gray-700">
                    {item.status}
                  </td> */}
                  <td className="w-1/5 text-center border-gray-700">
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
