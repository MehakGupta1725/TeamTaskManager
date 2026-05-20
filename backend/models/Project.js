const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Project = sequelize.define(
"Project",
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
}});

module.exports = Project;