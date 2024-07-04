const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('katapult', 'root', '786786', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
});
console.log('Connection has been established successfully.');
module.exports = sequelize;
