module.exports = (sequelize, DataTypes) => {
	const TeamIntroduction = sequelize.define('TeamIntroduction', {
		applicationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		teamIntroduction: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		entrepreneurialExperience: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		inspirationalEntrepreneur: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		missingSkills: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		incubationParticipation: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		professionalSituation: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		incubationSchedule: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	return TeamIntroduction;
};
