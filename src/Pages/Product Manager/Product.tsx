import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { Modals } from "../../Components/Modal";

type User = {
  name: string;
  thumbnail: string; // Store the image URL or file path
  price: string;
  category: string;
};

export const Product = () => {
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState<User[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // New state for tracking edit index

  // Input fields state
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For the file input
  const [previewUrl, setPreviewUrl] = useState("");
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setThumbnail(url); // Store the URL in the thumbnail state
    }
  };

  const deleteProduct = (indexToDelete: number) => {
    setAddUser((items) => items.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index: number) => {
    const userToEdit = addUser[index];
    setName(userToEdit.name);
    setThumbnail(userToEdit.thumbnail);
    setPrice(userToEdit.price);
    setCategory(userToEdit.category);
    setPreviewUrl(userToEdit.thumbnail);
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
    setPreviewUrl("");
    setName("");
    setThumbnail("");
    setPrice("");
    setCategory("");
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = { name, thumbnail, price, category };

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
        <h2 className="text-xl">Expense Management</h2>
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
        <h2 className="flex justify-between">Products</h2>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">Name</th>
              <th className="w-1/5 text-center border border-gray-700">
                Thumbnail
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Buying Price
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((item, index) => (
              <tr key={index}>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.name}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  <Avatar
                    src={item.thumbnail}
                    alt={item.name}
                    sx={{ width: 64, height: 64, margin: "auto" }}
                  />
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.price}
                </td>
                <td className="w-1/5 text-center text-[12px] border border-gray-700">
                  {item.category}
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

          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />

          <label htmlFor="thumbnailFile">Choose Thumbnail Image</label>
          <input
            id="thumbnailFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block mt-2"
          />

          {previewUrl && (
            <Avatar
              src={previewUrl}
              alt="Thumbnail Preview"
              sx={{ width: 64, height: 64, margin: "auto" }}
            />
          )}

          <label htmlFor="price">Buying Price</label>
          <input
            id="price"
            type="number"
            placeholder="Buying Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border-black border-2 w-full"
            required
          >
            <option value="">Select a category</option>
            <option value="electric">Electric</option>
            <option value="furniture">Furniture</option>
            <option value="phone">Phone</option>
            <option value="cloth">Cloth</option>
            <option value="technology">Technology</option>
            <option value="tools">Tools</option>
          </select>
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
