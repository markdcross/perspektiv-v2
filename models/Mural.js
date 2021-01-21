const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const MuralSchema = new Schema({
  // basic information regarding the mural
  name: {
    type: String,
    required: true
  },
  slug: String,
  description: {
    type: String
  },

  // use the following information to show how long the mural took to create
  dates: {
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    // if the mural is still being created, then we can set the current value to true
    // (only use for brand new murals that are currently being painted)
    current: {
      type: Boolean,
      default: false
    }
  },

  // use the following to showcase information about the mural's creator
  // TODO Do we need to connect this with an artist already registered with our app?
  artist: {
    name: {
      type: String
    },
    bio: {
      type: String
    },
    link: {
      type: String
    }
  },

  // location information about the mural
  location: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    }
  }
});

// Create mural slug from the name
MuralSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = Mural = mongoose.model('mural', MuralSchema);
