const { User } = require('../models');

const userData = [
    {
        username: "testUser1",
        password: "password1"
    },
    {
        username: "testUser2",
        password: "password2"
    },
    {
        username: "testUser3",
        password: "password3"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
