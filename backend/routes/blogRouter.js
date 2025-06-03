import express from 'express';
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContent } from '../controllers/blogController.js';
const blogRouter = express.Router();
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'

blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/get', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/togglePublish', auth, togglePublish);

blogRouter.post('/add-comment', addComment); 
blogRouter.post('/comments', getBlogComments); 

blogRouter.post('/generate', auth, generateContent)


export default blogRouter;