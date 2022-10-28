import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  userId: { 
    type:mongoose.Schema.Types.ObjectId, 
    required: true
  },
  titre: { 
    type:String, 
    required: true
  },
  description: { 
    type:String, 
    required: true
  },
  etat: { 
    type: Number, 
    required: true
  },
  disponible: { 
    type: Boolean, 
    default: true, 
    required: false
  },
  uri:{
      type: String,
      default: "https://www.thd.tn/wp-content/uploads/2022/08/fourniture-scolaire.jpg",
  }

},{
  timestamps: true
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article