import Post from '../models/Post.js'
import Comment  from '../models/Comment.js';
import User from '../models/User.js'

const create = async ( req, res, next) => {
  try { 
    const { titre, description, userId } = req.body;
    const post = new Post({
      titre: titre,
      description: description,
      userId: userId
    })
    await post.save((err, doc) => {
      if(err) throw err
      res.json({
        success: true,
        message: "Votre Publication a été ajouté avec succès"
      });
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }   
}

const findAll = async ( req, res, next) => {
  try { 
    const posts = await Post.aggregate([{
      $lookup: {
        from:User.collection.name,
        localField: 'userId',
        foreignField:'_id',
        as:'user'
      }
    }]).sort({createdAt:-1}).exec()
    res.json({
      success:true,
      posts: posts
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }   
}

const findMine = async ( req, res, next ) => {
  try {
    const id = req.params.id;
    const posts = await Post.find({userId: id}).sort({createdAt:-1}) 
    res.json({
      success:true,
      posts: posts
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const findComments = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({postId: id}).sort({createdAt:-1}) 
    const users = await User.find();
    res.json({
      success:true,
      comments: comments,
      users:users
    })
  } catch(error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const update = async ( req, res, next ) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndUpdate(
      {_id: id},
      {
        $set: {
          titre: req.body.titre,
          description: req.body.description
        }
      },
      {new: true}
    ).then((docs) => {
      if(docs) {
        res.json({
          success:true,
          message: "Votre Publication a été modifié avec succès",
          post:docs
        })
     } else {
      res.json({
        success:false,
        message: "Aucun Publication existe avec cette Id",
      })
     }
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({_id: id}).then(
      Comment.deleteMany({requestId: id}).then(
        res.json({
          success: true,
          message: "Votre Publication a été supprimer "
        })
      )
    )
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

export {
  create,
  findAll,
  findMine,
  findComments,
  update,
  remove
}