const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // a user is connected to each post (makes it so they can only delete their own posts, and allows us to show the user's avatar)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  mural: {
    type: mongoose.Schema.ObjectId,
    ref: 'Mural',
    required: true
  },
  // main post content
  text: {
    type: String,
    required: true,
    maxlength: 140
  },
  // TODO Add file upload functionality
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  // Posts can have likes from other users, so we need to include that within the model as an array that allows us to see which user has liked the post
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
        // this way we know which likes came from which user
        // a single can only "like" a single post once
      }
    }
  ],
  // posts can have comments too, so we need to define a comments array that allows us to see the user that commented, their comment, their name/avatar, and the date of the comment

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // generic date field for mongodb models
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = MuralPost = mongoose.model('MuralPost', PostSchema);
