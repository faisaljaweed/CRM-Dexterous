import { useEffect, useState } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

type CommentProps = {
  projectId: string | undefined; // projectId can be string or undefined
};

type Comment = {
  _id: string;
  content: string;
  owner: {
    username: string; // assuming you want to display the owner's name
  };
};

const Comment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // Check if the token exists
        if (!token) {
          toast.error("Token is missing or undefined");
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
        setComments(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchComments();
  }, []);
  // Handle comment submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Comment is required!");
      return;
    }

    // console.log("Project Id", projectId);
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
      console.log(response.data.data);
      toast.success("Comment created successfully");
      // setComments((prevComments) => [...prevComments, response.data.data]);
      setComments([...comments, response.data.data]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mt-3">
        <input
          type="text"
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded px-2 py-1 max-w-full mt-2 ml-1"
        />
        <button
          type="submit"
          className="ml-2 mt-2 size-8 justify-center flex items-center "
        >
          <SendIcon />
        </button>
      </form>

      <div>
        {comments.map((item: Comment, index: number) => {
          return (
            <div
              key={index}
              className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500"
            >
              <p className="text-start text-blue-500 font-bold border-b-4 border-blue-500">
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
