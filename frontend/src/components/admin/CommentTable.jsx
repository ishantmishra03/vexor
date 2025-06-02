import React from "react";
import { TiTick } from "react-icons/ti";
import { IoTrashBinOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTable = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();

  
  const { blog, createdAt, _id } = comment;

  const blogDate = new Date(createdAt);

  // Handle Approve Comment
  const handleApprove = async () => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment`, {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message || "Failed to approve comment.");
      }
    } catch (err) {
      toast.error(err.message || "Approval failed.");
    } 
  };

  // Handle Delete Comment
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post(`/api/admin/delete-comment`, {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message || "Failed to delete comment.");
      }
    } catch (err) {
      toast.error(err.message || "Delete failed.");
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-purple-50 transition">
      {/* Blog Title & Comment */}
      <td className="px-4 py-4 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-600">Blog:</span> {blog.title}
        </p>
        <p>
          <span className="font-medium text-gray-600">Name:</span>{" "}
          {comment.name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Comment:</span>{" "}
          {comment.content}
        </p>
      </td>

      {/* Date */}
      <td className="px-4 py-4 hidden sm:table-cell text-sm text-gray-500">
        {blogDate
          ? blogDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A"}
      </td>

      {/* Actions */}
      <td className="px-4 py-4 hidden sm:table-cell text-sm text-gray-600">
        <div className="flex gap-3 items-center">
          {!comment.isApproved ? (
            <TiTick 
            onClick={handleApprove}
            className="w-5 h-5 hover:scale-110 transition-all cursor-pointer text-green-500" />
          ) : (
            <p className="text-sx border border-green-500 bg-green-100 text-green-600 rounded-full px-3">Approved</p>
          )}
          <IoTrashBinOutline 
          onClick={handleDelete}
          className="w-5 h-5 hover:scale-110 transition-all cursor-pointer text-red-500"/>
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
