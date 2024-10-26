import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../compontes/svgs/Logo";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setIsAuthenticated, setToken } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    const responce = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });

    if (responce.status === 200) {
      setIsAuthenticated(true);
      setToken(responce.data.token);
      localStorage.setItem("token", responce.data.token);
      console.log(responce.data.token);
      navigate("/products");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#FCC5DC] px-6 py-4 flex items-center justify-between shadow-md">
        <Logo className="h-10 w-auto" />
      </nav>
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="bg-pink-200 h-20 flex items-center justify-center rounded-t-lg">
            <Logo className="h-10 w-auto" />
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-gray-700 block">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="admin"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-700 block">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#FCC5DC] hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
