const sequelize = require("../config/db");
const User = require("./user.model")(sequelize);
const Task = require("./task.model")(sequelize);

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Task };
