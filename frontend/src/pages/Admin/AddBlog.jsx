import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import {parse} from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    isPublished: false,
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write your blog content...",
    });

    quillRef.current.on("text-change", () => {
      setFormData((prev) => ({
        ...prev,
        content: quillRef.current.root.innerHTML,
      }));
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateContent = async () => {
    try {
      setLoading(true);
      const { title } = formData
      const {data} = await axios.post('/api/blog/generate', {prompt: title});
      console.log(data);
      if(data.success){
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const { title, description, content, category, isPublished } = formData;

      const blog = {
        title,
        description,
        content,
        category,
        isPublished,
      };

      const form = new FormData();
      form.append("blog", JSON.stringify(blog));
      form.append("image", image);

      const { data } = await axios.post("/api/blog/add", form);
      if (data.success) {
        toast.success(data.message);
        setFormData({
          title: "",
          description: "",
          content: "",
          category: "",
          isPublished: false,
        });
        setImage(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };



  return (
    <div className="min-h-screen  py-10 px-4 mx-auto mt-10 ">
      <div className="max-w-3xl md:w-3xl mx-auto bg-white  rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#9a36ff]">
          Create a New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Cover Image
            </label>
            <div className="w-full sm:w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 relative overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">Click to upload</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b469ff]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief summary of the blog..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b469ff]"
              required
            />
          </div>

          {/* Quill Editor */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Main Content
            </label>
            <div
              ref={editorRef}
              className="bg-white border border-gray-300 rounded-md h-64 overflow-y-auto focus-within:ring-2 focus-within:ring-[#b469ff]"
            />
            <button
              onClick={generateContent}
              disabled={loading}
              type="button"
              className="mt-2 text-sm text-[#9a36ff] underline hover:text-[#b469ff]"
            >
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b469ff]"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Coding">Coding</option>
              <option value="Finance">Finance</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPublished" 
              checked={formData.isPublished}
              onChange={handleChange}
              className="form-checkbox text-[#9a36ff]"
            />

            <span className="text-gray-700">Publish Now</span>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              disabled={isAdding}
              type="submit"
              className="bg-gradient-to-r from-[#9a36ff] to-[#b469ff] text-white px-8 py-2 rounded-full font-medium hover:opacity-90 transition"
            >
              {isAdding ? "Adding" : " Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
