import { useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Table = ({ blog, fetchBlogs, index }) => {
  const {axios} = useAppContext();
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);
  const formattedDate = blogDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statusText = isPublished ? "Published" : "Unpublished";
  const statusColor = isPublished ? "text-green-600" : "text-orange-600";

  
    //Toggle Publish
    const togglePublish = useCallback(async () => {
      try {
        const { data } = await axios.post('/api/blog/togglePublish', {id: blog._id});
        if(data.success){
          toast.success(data.message);
          fetchBlogs();
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
    }, [axios, fetchBlogs, blog._id])

    //Delete Blog 
    const deleteBlog = async () => {
      try {
        const confirm1 = confirm("Do you want to delete the blog ?")
        if(!confirm1) return;

        const { data } = await axios.post('/api/blog/delete', {id: blog._id});
        data.success ? toast.success(data.message) : toast.error(data.message);
        fetchBlogs();
      } catch (error) {
        toast.error(error.message);
      }
    }

  return (
    <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors">
      <th className="px-2 py-4 text-center w-12">{index}</th>

      <td className="px-2 py-4 min-w-[150px] break-words">{title}</td>

      <td
        className="px-2 py-4 hidden md:table-cell"
        title={blogDate.toString()}
      >
        {formattedDate}
      </td>

      <td className={`px-2 py-4 hidden md:table-cell`}>
        <p className={`${statusColor} font-semibold`}>{statusText}</p>
      </td>

      <td className="px-2 py-4 flex gap-3 items-center justify-center text-xs sm:text-sm">
        <button
        onClick={togglePublish}
          className={`border rounded px-3 py-1 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          aria-label={isPublished ? "Unpublish blog" : "Publish blog"}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>

        <RxCross2
        onClick={deleteBlog}
          className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-600 transition-transform hover:scale-110"
          aria-label="Delete blog"
          role="button"
          tabIndex={0}
        />
      </td>
    </tr>
  );
};

export default Table;
