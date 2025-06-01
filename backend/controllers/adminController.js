import jwt from 'jsonwebtoken'
import blogModel from '../models/blog.models.js';
import commentModel from '../models/comment.models.js';

export const adminLogin = async (req,res) => {
    const { email, password } = req.body;
    try {
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid credentials"}); 
        }

        let token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).sort({createdAt : -1});
        res.json({success: true, blogs});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getAllComments = async (req,res) => {
    try {
        const comments = await commentModel.find({}).populate("blog").sort({createdAt : -1});
        res.json({success: true, comments});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getDashboard = async (req,res) => {
    try {
        const recentBlogs = await commentModel.find({}).sort({createdAt : -1}).limit(5);
        const blogs = await blogModel.countDocuments();
        const comments = await commentModel.countDocuments();
        const drafts = await blogModel.countDocuments({isPublished: false});

        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }
        res.json({success: true, dashboardData });
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteCommentById = async (req,res) => {
    try {
        const {id} = req.body;
        await commentModel.findByIdAndDelete(id);
        res.json({success: true, message: "Deleted successfully"});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const approveCommentById = async (req,res) => {
    try {
        const {id} = req.body;
        await commentModel.findByIdAndUpdate(id, {isApproved : true});
        res.json({success: true, message: "Updated successfully"});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}