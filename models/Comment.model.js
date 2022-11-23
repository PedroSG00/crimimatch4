const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema(
    {
        author: {
            type: Types.ObjectId,
            ref: 'User'
        },

        text: {

            type: String,
            required: true
        }
    },

    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;



