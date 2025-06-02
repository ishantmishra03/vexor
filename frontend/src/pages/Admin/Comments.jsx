import { useState, useCallback, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import CommentTable from "../../components/admin/CommentTable";

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/admin/all-comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="flex-1 mt-25 lg:mt-20 px-5 sm:px-12 lg:px-20 bg-purple-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700 mb-4 sm:mb-0">Manage Comments</h1>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("Approved")}
              className={`border rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === "Approved"
                  ? "bg-purple-100 text-purple-700 border-purple-400"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Approved
            </button>

            <button
              onClick={() => setFilter("Not Approved")}
              className={`border rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === "Not Approved"
                  ? "bg-purple-100 text-purple-700 border-purple-400"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Not Approved
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-purple-100 text-purple-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Blog Title & Comment</th>
                <th className="px-6 py-4 text-left max-sm:hidden">Date</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments
                .filter((comment) =>
                  filter === "Approved"
                    ? comment.isApproved === true
                    : comment.isApproved === false
                )
                .map((comment) => (
                  <CommentTable
                    key={comment._id}
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
