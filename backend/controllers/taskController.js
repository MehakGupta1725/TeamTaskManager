const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

const createTask = async(req,res)=>{

try{

const {
title,
description,
projectId,
assignedTo,
dueDate
}
= req.body;

const project = await Project.findByPk(projectId);

if(!project){
return res.status(404).json({
message:"Project not found"
});
}

const user = await User.findByPk(assignedTo);
if(!user){
return res.status(404).json({
message:"User not found"
});
}

const task = await Task.create({
title,
description,
ProjectId:projectId,
assignedTo,
dueDate
});
res.status(201).json(task);
}

catch(error){
res.status(500).json(error);
}};

const getTasks = async(req,res)=>{

try{

if(req.user.role==="Admin"){
const tasks = await Task.findAll();
return res.json(tasks);
}

const tasks =
await Task.findAll({
where:{
assignedTo:req.user.id
}});

res.json(tasks);
}

catch(error){
res.status(500).json(error);
}};

const updateTaskStatus =async(req,res)=>{

try{
const {id} = req.params;
const {status} = req.body;

const task = await Task.findByPk(id);

if(!task){
return res.status(404).json({
message:"Task not found"
});
}

if(
req.user.role==="Member" &&
task.assignedTo !== req.user.id
){
return res.status(403).json({
message:
"Not your task"
});
}

task.status = status;
await task.save();
res.json(task);
}

catch(error){
res.status(500).json(error);
}};

const dashboard = async(req,res)=>{

try{
let whereClause = {};
if(req.user.role==="Member"){
whereClause = { assignedTo:req.user.id };
}

const tasks = await Task.findAll({ where:whereClause
});

const total = tasks.length;

const completed = tasks.filter(
t=>t.status==="Completed")
.length;

const pending = tasks.filter(
t=>t.status!=="Completed")
.length;

const overdue = tasks.filter(
t=> t.dueDate && new Date(t.dueDate) < new Date() && t.status!=="Completed")
.length;

res.json({
total,
completed,
pending,
overdue
});
}

catch(error){
res.status(500).json(error);
}};

module.exports = {createTask, getTasks, updateTaskStatus, dashboard};