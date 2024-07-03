const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('application_db', 'user', 'userpassword', {
	host: 'localhost',
	dialect: 'mysql',
	port: 9090,
});

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close();
	}
};

testConnection();
