import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../svgs/Logo";
import { IoListOutline, IoBagOutline, IoPersonOutline } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Filter nav items based on authentication
  const navItems = [
    { path: "/orders", icon: IoListOutline, label: "Orders" },
    { path: "/products", icon: IoBagOutline, label: "Products" },
  ];

  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (localStorage.getItem("token")) {
      setShowLogoutConfirm(!showLogoutConfirm);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    setShowLogoutConfirm(false);
  };

  return (
    <div className="h-screen w-28 bg-[#FCC5DC] flex flex-col items-center py-8 space-y-8 fixed">
      <Logo />

      <div className="flex flex-col space-y-6">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-xl ${
                location.pathname === item.path ? "bg-white" : "bg-[#FCC5DC]"
              }`}
            >
              <item.icon size={28} />
            </div>
          </Link>
        ))}

        {/* Profile/Logout Button */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className={`w-14 h-14 flex items-center justify-center rounded-xl ${
              location.pathname === "/" ? "bg-white" : "bg-[#FCC5DC]"
            }`}
          >
            <IoPersonOutline size={28} />
          </button>

          {/* Logout Popup */}
          {showLogoutConfirm && (
            <div className="absolute left-20 top-0 py-2 w-48 bg-white rounded-md shadow-xl z-50">
              <div className="px-4 py-2 text-sm text-gray-700 font-medium">
                {localStorage.getItem("username")}
              </div>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
