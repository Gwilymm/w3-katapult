module.exports = (sequelize, DataTypes) => {
	const Conscent = sequelize.define('Conscent', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		move: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		communicate: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		engagement: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});
	return Conscent;
};
