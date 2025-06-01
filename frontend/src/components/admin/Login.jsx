import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9a36ff]/20 to-[#b469ff]/20 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#9a36ff] text-center">
          Admin Login
        </h2>

        <label
          htmlFor="email"
          className="block mb-2 font-semibold text-[#0c193e]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a36ff]"
        />

        <label
          htmlFor="password"
          className="block mb-2 font-semibold text-[#0c193e]"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a36ff]"
        />

        <button
          type="submit"
          className="w-full bg-[#9a36ff] hover:bg-[#b469ff] transition-colors duration-300 text-white py-3 rounded-md font-semibold text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
