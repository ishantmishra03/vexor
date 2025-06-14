import express from 'express';
import { adminLogin, getAllBlogsAdmin, getAllComments, getDashboard, deleteCommentById, approveCommentById } from '../controllers/adminController.js';
const adminRouter = express.Router();
import auth from '../middlewares/auth.js';

adminRouter.post('/login', adminLogin);
adminRouter.get('/all-comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.get('/dashboard', getDashboard);
adminRouter.post('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);


export default adminRouter;