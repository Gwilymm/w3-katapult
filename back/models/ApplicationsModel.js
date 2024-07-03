module.exports = (sequelize, DataTypes) => {
	const Application = sequelize.define('Application', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		applicationYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		}
	});

	Application.associate = (models) => {
		Application.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
		Application.hasMany(models.ProjectTeam, { foreignKey: 'applicationId' });
		Application.hasOne(models.ProjectDetails, { foreignKey: 'applicationId' });
		Application.hasOne(models.EconomicModel, { foreignKey: 'applicationId' });
		Application.hasOne(models.Stakeholders, { foreignKey: 'applicationId' });
		Application.hasOne(models.TeamIntroduction, { foreignKey: 'applicationId' });
	};

	return Application;
};
