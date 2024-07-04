module.exports = (sequelize, DataTypes) => {
	const ProjectIdentity = sequelize.define('ProjectIdentity', {
		projectName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		activitySector: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		implantationTerritory: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		interventionZone: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		awareness: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});



	return ProjectIdentity;
};
