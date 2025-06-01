import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", to: "/admin", icon: "/home_icon.svg" },
  { name: "Add Blog", to: "/admin/addBlog", icon: "/add_icon.svg" },
  { name: "List Blogs", to: "/admin/listBlog", icon: "/list_icon.svg" },
  { name: "Comments", to: "/admin/comments", icon: "/comment_icon.svg" },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-20 md:pt-19">
      {navItems.map(({ name, to, icon }) => (
        <NavLink
          key={name}
          to={to}
          end={to === "/admin"} 
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors duration-200 ${
              isActive ? "bg-purple-500/30 border-r-4 border-purple-800" : "hover:bg-purple-500/30"
            }`
          }
          title={name}
        >
          <img src={icon} alt={`${name} icon`} className="min-w-4 w-5" />
          <p className="hidden md:block">{name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
