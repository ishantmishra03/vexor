import fs from 'fs';
import imagekit from '../config/imageKit.js';
import blogModel from '../models/blog.models.js';

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
