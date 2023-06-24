const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This is a comment on the first blog post.",
        user_id: 1,
        blog_post_id: 1
    },
    {
        comment_text: "This is a comment on the second blog post.",
        user_id: 2,
        blog_post_id: 2
    },
    {
        comment_text: "This is a comment on the third blog post.",
        user_id: 3,
        blog_post_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
