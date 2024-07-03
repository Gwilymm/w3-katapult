module.exports = (sequelize, DataTypes) => {
	const ProjectDetails = sequelize.define('ProjectDetails', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		genesis: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		problemAddressed: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		beneficiaries: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		offer: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		differentiation: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		socialImpactIndicators: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	return ProjectDetails;
};
