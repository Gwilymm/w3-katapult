const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('application_db', 'user', 'userpassword', {
	host: 'localhost',
	dialect: 'mysql',
	port: 9090,
});
console.log('Connection has been established successfully.');
module.exports = sequelize;
