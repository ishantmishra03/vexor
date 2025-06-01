import express from 'express';
import { addBlog } from '../controllers/blogController.js';
const blogRouter = express.Router();
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'

blogRouter.post('/add', upload.single('image'), auth, addBlog);


export default blogRouter;