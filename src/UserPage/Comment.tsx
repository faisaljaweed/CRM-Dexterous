import { useState } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

type CommentProps = {
  projectId: string | undefined; // projectId can be string or undefined
};

interface Comment {
  _id: string;
  content: string;
  owner: {
    name: string; // assuming you want to display the owner's name
  };
}

const Comment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  // Handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment) {
      alert("Comment is required!");
      return;
    }
    console.log("Project Id", projectId);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token is missing or undefined");
        return;
      }

      // Send the comment to the backend
      const response = await axios.post(
        `http://localhost:8000/api/v1/comment/add-comment/${projectId}`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment added:", response.data.data);

      // Update state to include the new comment
      setComments((prevComments) => [...prevComments, response.data.data]);
      setComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="ml-2">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Comment;

// Comment get Api
//http://localhost:8000/api/v1/comment/getallcomment/673b7d8f11f22978df0fbee0
