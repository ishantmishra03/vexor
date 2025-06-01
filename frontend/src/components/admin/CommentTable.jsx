import React from 'react';
import { TiTick } from "react-icons/ti";
import { IoTrashBinOutline } from "react-icons/io5";

const CommentTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, name, content, isApproved } = comment;
  const blogDate = new Date(createdAt);

  return (
    <tr className="border-b border-gray-200 hover:bg-purple-50 transition">
      {/* Blog Title & Comment */}
      <td className="px-4 py-4 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-600">Blog:</span> {blog.title}
        </p>
        <p>
          <span className="font-medium text-gray-600">Name:</span> {name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Comment:</span> {content}
        </p>
      </td>

      {/* Date */}
      <td className="px-4 py-4 hidden sm:table-cell text-sm text-gray-500">
        {blogDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </td>

      {/* Actions */}
      <td className="px-4 py-4 hidden sm:table-cell text-sm text-gray-600">
        <div className="flex gap-3 items-center">
          {!isApproved ? (
            <TiTick
              className="w-6 h-6 text-green-500 cursor-pointer hover:scale-110 transition-transform"
              title="Approve"
            />
          ) : (
            <IoTrashBinOutline
              className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition-transform"
              title="Delete"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
