import { useEffect, useState } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

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

const Comment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
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
          console.error("User data is not an array:", response.data);
        }

        console.log(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchComments();
  }, []);
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
      const newComment = response.data.data;
      setComments((prevComments) => [...prevComments, newComment]);
      setComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-2 py-1 max-w-full mt-2"
        />
        <button type="submit" className="ml-2">
          <SendIcon />
        </button>
      </form>

      <div>
        {comments.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="border-2 border-black flex justify-start items-start flex-col pl-2 mt-2"
            >
              <p className="text-start text-red-700 font-bold border-b-4 border-red-700">
                @{item.owner?.username}
              </p>
              <p className="text-start font-thin">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;

// Comment get Api
//http://localhost:8000/api/v1/comment/getallcomment/673b7d8f11f22978df0fbee0
