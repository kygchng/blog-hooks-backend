const express = require("express"); //backend framework that handles API requests
const router = express.Router();

const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
var ObjectId = require("mongodb").ObjectId;

router.post("/create/post", async(req, res) => {
    const newPost = new Post(req.body);
    newPost.save().catch(err => console.log(err));
    return res.status(200).send(newPost);
})

router.post("/create/comment", async(req, res) => {
    const postId = ObjectId(req.body.post_id);
    const post = await Post.findById(postId);
    if(post) {
        const newComment = new Comment(req.body);
        newComment.save().catch(err => console.log(err));
        return res.status(200).send(newComment);
    } else {
        return res.status(404).send({});
    }
})

router.get("/fetch/posts", async(req, res) => {
    const postList = await Post.find();
    if(postList.length != 0) {
        return res.status(200).send(postList);
    } else {
        return res.status(404).send({});
    }
})

router.get("/fetch/comments/:postID", async(req, res) => {
    const postId = ObjectId(req.params.postID);
    const post = await Post.findById(postId);
    if(post) {
        const commentList = await Comment.find({post_id: req.params.postID});
        return res.status(200).send(commentList);
    } else {
        return res.status(404).send({});
    }
})


module.exports = router;