import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { Inputs } from "./Inputs";

import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState<string | null>(null); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://crm-backend-sage.vercel.app/api/v1/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
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
        // setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log("Unsuccessfully", error);
    }

    setEmail("");
    setPassword("");
    // setError(null);
  };

  return (
    // <div className="flex items-center justify-center min-h-screen ">
    //   <div className="md:w-[25rem] w-full max-w-md md:p-8 p-2 rounded-lg ">
    //     {/* <div className="flex items-center justify-center">
    //       <img className="w-36 h-36" src={Logo} alt="Logo" />
    //     </div> */}
    //     <h2 className="text-[40px] font-bold mb-6 text-center text-white">
    //       Login
    //     </h2>
    //     {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label
    //           htmlFor="email"
    //           className="block  text-[24px] font-bold mb-2 text-white"
    //         >
    //           Email
    //         </label>
    //         <Inputs
    //           type="email"
    //           id="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //             setEmail(e.target.value)
    //           }
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label
    //           htmlFor="password"
    //           className="block text-white text-[24px] font-bold mb-2"
    //         >
    //           Password
    //         </label>
    //         <div className="relative">
    //           <Inputs
    //             type={showPassword ? "text" : "password"}
    //             id="password"
    //             value={password}
    //             placeholder="Password"
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //               setPassword(e.target.value)
    //             }
    //           />
    //           <div className="absolute right-2 top-2">
    //             {showPassword ? (
    //               <VisibilityIcon onClick={() => setShowPassword(false)} />
    //             ) : (
    //               <VisibilityOffIcon onClick={() => setShowPassword(true)} />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         Log In
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <>
      {" "}
      <div
        className="min-h-screen bg-gradient-to-br
       from-teal-500 to-teal-700 
       flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">DEX CRM</h1>
            <p className="text-teal-100">Manage your business with ease</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Welcome
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-teal-100">
            &copy; {new Date().getFullYear()} Dex CRM. All rights reserved.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default LoginScreen;
