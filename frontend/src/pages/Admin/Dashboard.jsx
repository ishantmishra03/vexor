import React, { useCallback, useEffect, useState } from "react";
import { FiFileText, FiMessageCircle, FiFile } from "react-icons/fi";
import Table from "../../components/Table/Table";
import { dashboard_data } from "../../data/blogs";

export default function BlogDashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchData = useCallback(async () => {
    setDashboardData(dashboard_data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 mt-12 min-h-screen">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start max-sm:hidden">
        {/* Blogs */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <FiFileText
            size={56}
            className="text-indigo-500 bg-indigo-100 rounded-lg p-2"
          />
          <div>
            <p className="text-2xl font-semibold text-purple-700">
              {dashboardData.blogs}
            </p>
            <p className="text-indigo-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <FiMessageCircle
            size={56}
            className="text-indigo-500 bg-indigo-100 rounded-lg p-2"
          />
          <div>
            <p className="text-2xl font-semibold text-indigo-700">
              {dashboardData.comments}
            </p>
            <p className="text-indigo-400 font-light">Comments</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[150px] rounded shadow cursor-pointer hover:scale-105 transition-transform">
          <FiFile
            size={56}
            className="text-indigo-500 bg-indigo-100 rounded-lg p-2"
          />
          <div>
            <p className="text-2xl font-semibold text-indigo-700">
              {dashboardData.drafts}
            </p>
            <p className="text-indigo-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className="mt-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4 text-purple-700 font-semibold text-lg">
          <FiFileText size={22} className="text-purple-500" />
          <p>Latest Blogs</p>
        </div>

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
              {dashboardData.recentBlogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-indigo-400">
                    No blogs available
                  </td>
                </tr>
              ) : (
                dashboardData.recentBlogs.map((blog, index) => (
                  <Table
                    blog={blog}
                    index={index + 1}
                    key={blog.id}
                    fetchBlogs={fetchData}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
