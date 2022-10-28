import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  titre: {
    required: true, 
    type: String
  },
  description: {
    required: true, 
    type: String
  },
  userId: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId
  }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

export default Post