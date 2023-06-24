const { BlogPost } = require('../models');

const blogpostData = [
    {
        title: "First Blog Post",
        contents: "This is the first blog post.",
        user_id: 1
    },
    {
        title: "Second Blog Post",
        contents: "This is the second blog post.",
        user_id: 2
    },
    {
        title: "Third Blog Post",
        contents: "This is the third blog post.",
        user_id: 3
    },
];

const seedBlogPosts = () => BlogPost.bulkCreate(blogpostData);

module.exports = seedBlogPosts;
