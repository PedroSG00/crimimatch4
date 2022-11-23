const { Schema, model, Types } = require("mongoose");

const newSchema = new Schema(
    {
        header: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            // required: true
        },

        body: {
            type: String,
            required: true
        },

        link: {
            type: String,
        },

        comments: [{
            type: Types.ObjectId,
            ref: 'Comment'
        }],
    },

    {
        timestamps: true,
    }
);

const New = model("New", newSchema);

module.exports = New;





