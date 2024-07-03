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
db.User.hasMany(db.Application);
db.Application.belongsTo(db.User);

db.Application.hasOne(db.ProjectDetails);
db.ProjectDetails.belongsTo(db.Application);

db.Application.hasOne(db.EconomicModel);
db.EconomicModel.belongsTo(db.Application);

db.Application.hasOne(db.Stakeholders);
db.Stakeholders.belongsTo(db.Application);

db.Application.hasOne(db.TeamIntroduction);
db.TeamIntroduction.belongsTo(db.Application);

db.Application.hasMany(db.ProjectTeam);
db.ProjectTeam.belongsTo(db.Application);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
