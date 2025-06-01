import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <Link to={`/blog/${blog._id}`}>
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-100 transform  m-4 w-full sm:w-96 bg-white max-w-sm cursor-pointer">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-52 object-cover hover:scale-105 transition-all"
          />
          <div className="p-6 flex flex-col">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full w-max">
              {blog.category}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-300 cursor-pointer leading-snug">
              {blog.title}
            </h3>
            <p className="mt-4 text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {blog.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
