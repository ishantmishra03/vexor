import { useEffect, useState } from 'react';
import { comments_data } from '../../data/blogs';
import CommentTable from '../../components/admin/CommentTable';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const fetchComments = async () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='flex-1 mt-25 px-4 sm:px-10 bg-purple-50/50 min-h-screen'>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-5xl mb-6">
        <h1 className="text-xl font-semibold text-purple-700">Comments</h1>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-sm transition ${
              filter === "Approved"
                ? "text-purple-600 border-purple-400 bg-purple-100"
                : "text-gray-600 border-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-sm transition ${
              filter === "Not Approved"
                ? "text-purple-600 border-purple-400 bg-purple-100"
                : "text-gray-600 border-gray-300"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative max-w-5xl overflow-x-auto bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-700">
          <thead className="uppercase text-xs bg-purple-100 text-left text-purple-700">
            <tr>
              <th className="px-4 py-4">Blog Title & Comment</th>
              <th className="px-4 py-4 hidden sm:table-cell">Date</th>
              <th className="px-4 py-4 hidden sm:table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) =>
                filter === "Approved"
                  ? comment.isApproved === true
                  : comment.isApproved === false
              )
              .map((comment, index) => (
                <CommentTable
                  key={index}
                  comment={comment}
                  fetchComments={fetchComments}
                />
              ))}
            {comments.filter((comment) =>
              filter === "Approved"
                ? comment.isApproved === true
                : comment.isApproved === false
            ).length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-purple-400">
                  No {filter.toLowerCase()} comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
