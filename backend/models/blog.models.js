import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    isPublished : {
        type: Boolean,
        required: true,
    }
}, {timestamps: true});

const blogModel = mongoose.model('blog', blogSchema);
export default blogModel;