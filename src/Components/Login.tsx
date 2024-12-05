import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Inputs } from "./Inputs"; // Assuming you have an Inputs component
//logo
import Logo from "../Images/logo.webp";
import { toast } from "react-toastify";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("res from server", data);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("username", data.data.loggedInUser.username);
        localStorage.setItem("role", data.data.loggedInUser.role);
        console.log("Tokens stored in localStorage:", {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        });
        toast.success("Registeration Successful");
        if (data.data.loggedInUser.role === "admin") {
          navigate("/drawer");
        } else {
          navigate("/userDashboard");
        }
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log("Unsuccessfully", error);
    }

    setEmail("");
    setPassword("");
    setError(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="md:w-[25rem] w-full max-w-md md:p-8 p-2 rounded-lg ">
        {/* <div className="flex items-center justify-center">
          <img className="w-36 h-36" src={Logo} alt="Logo" />
        </div> */}
        <h2 className="text-[40px] font-bold mb-6 text-center text-white">
          Login
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  text-[24px] font-bold mb-2 text-white"
            >
              Email
            </label>
            <Inputs
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-[24px] font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Inputs
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <div className="absolute right-2 top-2">
                {showPassword ? (
                  <VisibilityIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <VisibilityOffIcon onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
