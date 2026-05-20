const { DataTypes } = require("sequelize");

const sequelize =
require("../config/db");

const Task = sequelize.define(
"Task",
{

id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

title:{
type:DataTypes.STRING,
allowNull:false
},

description:{
type:DataTypes.TEXT
},

status:{
type:DataTypes.ENUM(
"Todo",
"In Progress",
"Completed"),
defaultValue:"Todo"
},

dueDate:{
type:DataTypes.DATE
}});

module.exports = Task;