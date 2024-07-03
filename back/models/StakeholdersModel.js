module.exports = (sequelize, DataTypes) => {
	const Stakeholders = sequelize.define('Stakeholders', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		partnerships: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		stakeholderRoles: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	});
	return Stakeholders;
};
