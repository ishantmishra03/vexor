import { useCallback, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogList = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);

  //Fetch Blogs
  const fetchBlogs = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, [axios]);


  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  return (
    <div className="flex-1 mt-22 md:mt-16 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>

      <div className="relative overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-purple-600">
          <thead className="text-xs text-purple-500 text-left uppercase bg-indigo-100">
            <tr>
              <th scope="col" className="px-3 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-3 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-3 py-4 hidden sm:table-cell">
                Date
              </th>
              <th scope="col" className="px-3 py-4 hidden sm:table-cell">
                Status
              </th>
              <th scope="col" className="px-3 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-indigo-400">
                  No blogs available
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <Table
                  blog={blog}
                  index={index + 1}
                  key={blog.id}
                  fetchBlogs={fetchBlogs}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
