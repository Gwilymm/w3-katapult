module.exports = (sequelize, DataTypes) => {
	const EconomicModel = sequelize.define('EconomicModel', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		revenueSources: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		jobCreation: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		economicViability: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		diversificationProjects: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	return EconomicModel;
};
