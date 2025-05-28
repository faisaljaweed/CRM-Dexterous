// import { useEffect, useState } from "react";
// import axios from "axios";
// import SendIcon from "@mui/icons-material/Send";
// import { toast } from "react-toastify";

// type CommentProps = {
//   projectId: string | undefined; // projectId can be string or undefined
// };

// type Comment = {
//   _id: string;
//   content: string;
//   owner: {
//     username: string; // assuming you want to display the owner's name
//   };
// };

// const Comment = ({ projectId }: CommentProps) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [comment, setComment] = useState("");
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");

//         // Check if the token exists
//         if (!token) {
//           toast.error("Token is missing or undefined");
//           return;
//         }
//         const response = await axios.get(
//           `https://crm-backend-sage.vercel.appapi/v1/comment/getallcomment/${projectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Add the token here
//             },
//           }
//         );
//         setComments(response.data.data);
//       } catch (error) {
//         console.log("Error", error);
//       }
//     };
//     fetchComments();
//   }, []);
//   // Handle comment submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!comment) {
//       toast.error("Comment is required!");
//       return;
//     }

//     // console.log("Project Id", projectId);
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("Token is missing or undefined");
//         return;
//       }

//       // Send the comment to the backend
//       const response = await axios.post(
//         `https://crm-backend-sage.vercel.appapi/v1/comment/add-comment/${projectId}`,
//         {
//           content: comment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data.data);
//       toast.success("Comment created successfully");
//       // setComments((prevComments) => [...prevComments, response.data.data]);
//       setComments([...comments, response.data.data]);
//       setComment("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="flex mt-3">
//         <input
//           type="text"
//           placeholder="Enter your comment"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="border rounded px-2 py-1 max-w-full mt-2 ml-1"
//         />
//         <button
//           type="submit"
//           className="ml-2 mt-2 size-8 justify-center flex items-center "
//         >
//           <SendIcon />
//         </button>
//       </form>

//       <div>
//         {comments.map((item: Comment, index: number) => {
//           return (
//             <div
//               key={index}
//               className="p-2 mt-2 bg-white shadow-lg rounded-2xl ml-2 hover:border-[2px] hover:border-blue-500"
//             >
//               <p className="text-start text-blue-500 font-bold border-b-4 border-blue-500">
//                 @{item.owner?.username}
//               </p>
//               <p className="text-start font-thin">{item.content}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Comment;

import { useEffect, useState } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type CommentProps = {
  projectId: string | undefined;
};

type Comment = {
  _id: string;
  content: string;
  owner: {
    username: string;
  };
  createdAt?: string;
};

const Comment = ({ projectId }: CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");

        if (!token) {
          toast.error("Please login to view comments");
          return;
        }

        const response = await axios.get(
          `https://crm-backend-sage.vercel.appapi/v1/comment/getallcomment/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchComments();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    if (!projectId) {
      toast.error("No project selected");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to comment");
        return;
      }

      const response = await axios.post(
        `https://crm-backend-sage.vercel.appapi/v1/comment/add-comment/${projectId}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment added successfully");
      setComments([response.data.data, ...comments]); // Newest comment first
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4 p-2">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !comment.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
              comment.trim()
                ? "text-blue-600 hover:bg-blue-50"
                : "text-gray-400"
            } transition-colors`}
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
        {isLoading && comments.length === 0 ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((item) => (
            <div
              key={item._id}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="pt-1">
                  <AccountCircleIcon
                    className="text-gray-400"
                    fontSize="medium"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      @{item.owner?.username || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700 text-sm">{item.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
