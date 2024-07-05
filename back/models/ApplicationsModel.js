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

	return Application;
};
