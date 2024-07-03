const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); // Importez la configuration de la base de données
const Sequelize = require('sequelize');

const db = {};

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== path.basename(__filename) &&
			file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[ model.name ] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[ modelName ].associate) {
		db[ modelName ].associate(db);
	}
});

// Define relationships
db.User.hasMany(db.Application, { foreignKey: 'userId', as: 'applications' });
db.Application.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Application.hasOne(db.ProjectDetails, { foreignKey: 'applicationId', as: 'projectDetails' });
db.ProjectDetails.belongsTo(db.Application, { foreignKey: 'applicationId', as: 'application' });

db.Application.hasOne(db.EconomicModel, { foreignKey: 'applicationId', as: 'economicModel' });
db.EconomicModel.belongsTo(db.Application, { foreignKey: 'applicationId', as: 'application' });

db.Application.hasOne(db.Stakeholders, { foreignKey: 'applicationId', as: 'stakeholders' });
db.Stakeholders.belongsTo(db.Application, { foreignKey: 'applicationId', as: 'application' });

db.Application.hasOne(db.TeamIntroduction, { foreignKey: 'applicationId', as: 'teamIntroduction' });
db.TeamIntroduction.belongsTo(db.Application, { foreignKey: 'applicationId', as: 'application' });

db.Application.hasMany(db.ProjectTeam, { foreignKey: 'applicationId', as: 'projectTeams' });
db.ProjectTeam.belongsTo(db.Application, { foreignKey: 'applicationId', as: 'application' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
