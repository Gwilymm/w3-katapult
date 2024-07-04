module.exports = (sequelize, DataTypes) => {
	const ProjectTeam = sequelize.define('ProjectTeam', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return ProjectTeam;
};
