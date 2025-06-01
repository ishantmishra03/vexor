import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { blogs, comments_data } from "../data/blogs";
import { Loader } from "../components";
import Moment from "moment";
import { FaUser } from "react-icons/fa";
import { Footer, Navbar } from "../components"

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchData = useCallback(() => {
    const blog = blogs.find((item) => item._id === Number(id));
    setData(blog);
  }, [id]);

  const fetchComments = useCallback(() => {
    setComments(comments_data);
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    // const newComment = {
    //   name,
    //   content,
    //   createdAt: new Date()
    // };
    // setComments([newComment, ...comments]);
    // setName('');
    // setContent('');
  };

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [fetchData, fetchComments]);

  if (!data) return <Loader />;

  return (
     <>
     <Navbar />
    <div className="w-full pt-32 md:pt-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-[#9a36ff] font-semibold mb-2">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
          {data.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">{data.description}</p>

        <img
          src={data.image}
          alt={data.category}
          className="rounded-3xl mb-10 w-full object-cover"
        />

        <div
          className="prose prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>

      {/* Comments Section */}
      <div className="comments mt-16 max-w-3xl mx-auto pb-16 border-b border-b-black/10">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>

        <div className="flex flex-col gap-5 mb-10">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-700 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="w-5 h-5 text-gray-500" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm ml-7 mb-3">{item.content}</p>
              <span className="absolute right-4 bottom-3 text-xs text-gray-400">
                {Moment(item.createdAt).fromNow()}
              </span>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={addComment} className="space-y-4">
          <h3 className="text-lg font-medium">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="Your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
          <button
            type="submit"
            className="bg-[#9a36ff] text-white px-6 py-2 rounded-md hover:bg-[#852ee6] transition-colors"
          >
            Add Comment
          </button>
        </form>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Blog;
