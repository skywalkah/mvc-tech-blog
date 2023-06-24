const sequelize = require('../db/config');
const seedUsers = require('./userData');
const seedBlogPosts = require('./blogpostData');
const seedComments = require('./commentData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedBlogPosts();

    await seedComments();

    process.exit(0);
};

seedAll();
