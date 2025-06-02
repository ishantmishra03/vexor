import fs from 'fs';
import imagekit from '../config/imageKit.js';
import blogModel from '../models/blog.models.js';
import commentModel from '../models/comment.models.js';

export const addBlog = async (req, res) => {
    try {
        const { title, description, content, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !content || !category || isPublished === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs',
        });

        // Optimized image URL
        const optimizedImageUrl = imagekit.url({
            path: uploadResponse.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        const blog = await blogModel.create({
            title,
            description,
            content,
            category,
            image: optimizedImageUrl,
            isPublished,
        });

        res.status(201).json({ success: true, message: "Blog Added Successfully", blog });

    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({ isPublished: true });
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await blogModel.findByIdAndDelete(id);

        await commentModel.deleteMany({blog : id});
        res.json({ success: true, message: "Blog deleted successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await blogModel.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        const comment = await commentModel.create({
            blog, name, content,
        })

        res.json({ success: true, message: "Comment added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogComments = async (req,res) => {
    try {
        const { blogId } = req.body;
        const comments = await commentModel.find({blog : blogId, isApproved: true}).sort({createdAt : -1});
        res.json({ success: true, comments});
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

