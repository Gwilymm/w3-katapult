module.exports = (sequelize, DataTypes) => {
	const ProjectTeam = sequelize.define('ProjectTeam', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return ProjectTeam;
};
