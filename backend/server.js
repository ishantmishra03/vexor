import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js'
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRouter.js';

const app = express();

// Configurations 
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.get('/', (req, res) => {
    res.send("Server working");
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})