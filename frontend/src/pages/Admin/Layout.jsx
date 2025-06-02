import { Outlet,useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext"

const Layout = () => {
  const {navigate , setToken} = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-b-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center py-4">
            {/* Logo */}
            <div
              className="w-32 sm:w-40 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="Vexor"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Logout Button */}
            <div className="mt-3 sm:mt-0">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#9a36ff] hover:bg-[#b87aff] text-white rounded-xl font-medium shadow transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9a36ff] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
