const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	user: String,
    post_id: String,
    image: String, 
	time: String,
	text: String
});

module.exports = mongoose.model("Comment", CommentSchema);