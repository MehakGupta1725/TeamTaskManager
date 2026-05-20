const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

User.belongsToMany(Project,{
through:"ProjectMembers"
});

Project.belongsToMany(User,{
through:"ProjectMembers"
});

Project.hasMany(Task);

Task.belongsTo(Project);

User.hasMany(Task,{
foreignKey:"assignedTo"
});

Task.belongsTo(User,{
foreignKey:"assignedTo"
});