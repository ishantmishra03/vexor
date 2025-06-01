import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BlogCard from "../BlogCard/BlogCard";
import { useAppContext } from "../../context/AppContext";

const categories = ["All", "Technology", "Coding", "Travel", "Finance"];

const BlogList = () => {
  const [active, setActive] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = useMemo(() => {
  const keyword = input.toLowerCase();
  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(keyword) ||
      blog.category.toLowerCase().includes(keyword)
  );
}, [blogs, input]);

  return (
    <div className="pt-8 w-full">
      <div className="flex flex-wrap gap-5 justify-center">
        {categories.map((item) => {
          const isActive = item === active;

          return (
            <motion.div
              key={item}
              onClick={() => setActive(item)}
              className="px-4 py-2 cursor-pointer rounded-xl"
              style={{ position: "relative" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBg"
                  className="absolute inset-0 rounded-full bg-[#9a36ff]/90"
                  style={{ backgroundColor: "", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span
                className={
                  isActive ? "text-white font-semibold" : "text-gray-700"
                }
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center  mx-auto p-4">
        {filteredBlogs.filter((blog) => active === "All" ? true : blog.category === active).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogList;
