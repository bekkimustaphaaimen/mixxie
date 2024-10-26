import { Link, useLocation } from "react-router-dom";
import Logo from "../svgs/Logo";
import { IoListOutline, IoBagOutline, IoPersonOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const navItems = [
  { path: "/orders", icon: IoListOutline, label: "Orders" },
  { path: "/products", icon: IoBagOutline, label: "Products" },
  { path: "/", icon: IoPersonOutline, label: "LoginPage" },
];

const Sidebar = () => {
  const location = useLocation();
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
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
