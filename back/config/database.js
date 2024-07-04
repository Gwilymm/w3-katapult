const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('katapult', 'root', '786786', {
<<<<<<< Updated upstream
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
=======
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
>>>>>>> Stashed changes
});

module.exports = sequelize;
