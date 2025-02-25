import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-1/4 h-screen bg-gray-900 text-white flex flex-col p-6 shadow-lg fixed left-0 top-0 bottom-0">
      <h2 className="text-xl font-bold mb-6">CMS Portal</h2>
      <nav>
        <ul className="space-y-4">
          {user ? (
            <>
              <li>
                <NavLink to="/add" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                  Add Content
                </NavLink>
              </li>
              <li>
                <NavLink to="/view" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                  View Content
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;