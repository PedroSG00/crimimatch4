const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Username need to have at least 3 characters'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    imageUrl: {
      type: String,
      required: [true, 'Profile Image is required']
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    role: {
      type: String,
      enum: ['USER', 'MODERATOR', 'ADMIN'],
      default: 'USER'
    },

    favorites: [{
      type: Types.ObjectId,
      ref: 'New'
    }]

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;





