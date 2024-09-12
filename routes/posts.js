const express = require("express");
const router = express.Router();
const {
    getPosts,
    setPost,
    updatePost,
    deletePost,
} = require("../controllers/posts");
const auth = require("../middlewares/auth");

router.get("/", getPosts);
router.post("/", auth, setPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
