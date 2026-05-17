import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, User } from "lucide-react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/userLogin");
  };

  // Read user info for avatar
  let userPhoto = "";
  let userName = "U";
  try {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    userPhoto = u.profilePhoto || "";
    userName = u.username || "U";
  } catch (_) {}

  if (!isLoggedIn) return null;

  const avatarSrc = userPhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=000&color=fff&size=64`;

  return (
    <nav className="sticky top-0 z-40 w-full h-[60px] bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-6 gap-4">
      {/* Spacer for mobile burger button (64px) */}
      <div className="w-8 md:hidden shrink-0" />

      {/* Search */}
      <div className="relative flex-1 max-w-sm hidden sm:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-100/60 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 rounded-lg pl-9 pr-4 py-1.5 text-[13px] text-gray-900 placeholder:text-gray-400 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>

        {/* Profile avatar */}
        <Link to="/profile" className="flex items-center gap-2 pl-2 md:pl-4 md:border-l border-gray-200 group">
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-7 h-7 rounded-full border border-gray-200 object-cover group-hover:border-gray-400 transition-colors"
          />
          <span className="text-sm font-medium text-gray-700 hidden md:block group-hover:text-gray-900 transition-colors truncate max-w-[100px]">
            {userName}
          </span>
        </Link>

        {/* Logout — always visible on mobile */}
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;