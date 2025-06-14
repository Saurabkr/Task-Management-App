const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    effort: { type: DataTypes.INTEGER },
    due_date: { type: DataTypes.DATE },
  });

  return Task;
};
