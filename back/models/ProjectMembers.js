// coordonnées co-porteur
module.exports = (sequelize, DataTypes) => {
	const ProjectMembers = sequelize.define('ProjectMembers', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		projectId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	return ProjectMembers;
};
