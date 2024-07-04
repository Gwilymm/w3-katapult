module.exports = (sequelize, DataTypes) => {
	const Economic = sequelize.define('EconomicModel', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		revenueSources: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		jobCreation: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		economicViability: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		diversificationProjects: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		partnerships: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		partnershipsResearch: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		stakeholderRoles: {
			type: DataTypes.TEXT,
			allowNull: true,
		}
	});
	return Economic;
};
