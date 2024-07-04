module.exports = (sequelize, DataTypes) => {
  const TeamIntroduction = sequelize.define("TeamIntroduction", {
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamIntroduction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    entrepreneurialExperience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    inspirationalEntrepreneur: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    missingSkills: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    incubationParticipation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    professionalSituation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    incubationSchedule: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return TeamIntroduction;
};
