const { model, Schema, SchemaTypes } = require("mongoose");

const postSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    imgUrl: {
        type: SchemaTypes.String,
    },
});

const PostModel = model("post", postSchema);

module.exports = PostModel;
