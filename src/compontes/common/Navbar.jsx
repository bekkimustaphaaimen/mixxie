import Logo from "../svgs/Logo";

const Navbar = () => {
  return (
    <nav className="bg-[#FCC5DC] px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Logo className="h-10 w-auto" />
      </div>
    </nav>
  );
};

export default Navbar;
