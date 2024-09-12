const { isValidObjectId } = require("mongoose");
const PostModel = require("../models/post");
const CustomError = require("../utils/customError");
const {
    createPostValidationSchema,
    updatePostValidationSchema,
} = require("../utils/postValidate");

const getPosts = async (req, res) => {
    const posts = await PostModel.find({});
    res.status(200).send(posts);
};

const setPost = async (req, res) => {
    try {
        await createPostValidationSchema.validate(req.body, {
            stripUnknown: false,
        });
    } catch (error) {
        throw new CustomError(422, error.message);
    }
    const { id: userId } = req.user;
    await PostModel.create({ userId, ...req.body });
    res.status(201).send("Post Created");
};

const updatePost = async (req, res) => {
    try {
        await updatePostValidationSchema.validate(req.body, {
            stripUnknown: false,
        });
    } catch (error) {
        throw new CustomError(422, error.message);
    }

    const { id: postId } = req.params;
    const { id: userId } = req.user;

    if (!isValidObjectId(postId)) throw new CustomError(400, "Invalid post id");

    if (!(await PostModel.findById(postId)))
        return res.status(200).send("No such post exists");

    if (!(await PostModel.findOne({ _id: postId, userId })))
        throw new CustomError(
            403,
            "You do not have right to modify this post!!!"
        );

    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
        new: true,
    });
    if (updatedPost) res.send("Post updated");
};

const deletePost = async (req, res) => {
    const { id: postId } = req.params;
    const { id: userId } = req.user;

    if (!isValidObjectId(postId)) throw new CustomError(400, "Invalid post id");

    if (!(await PostModel.findById(postId)))
        return res.status(200).send("No such post exists");

    if (!(await PostModel.findOne({ _id: postId, userId })))
        throw new CustomError(
            403,
            "You do not have right to remove this post!!!"
        );
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (deletedPost) res.send("Post deleted");
};

module.exports = { getPosts, setPost, updatePost, deletePost };
