module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profilePicture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		siret: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birthDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},

	}, {
		timestamps: false,
	});
	return User;
};

