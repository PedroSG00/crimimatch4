const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    imageUrl: {
      type: String
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['USER', 'MODERATOR', 'ADMIN'],
      default: 'USER'
    }

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;





