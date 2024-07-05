module.exports = (sequelize, DataTypes) => {
	const LegalStructure = sequelize.define('LegalStructure', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		structureName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		legalStatus: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otherStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		creationDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		applicationContext: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otherContext: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		referentStatus: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		referentDuration: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		siret: {
			type: DataTypes.STRING,
			allowNull: true,
		},

	});

	return LegalStructure;
};
