const User = require("../models/User");
const Project = require("../models/Project");

const createProject = async(req,res)=>{
try{
const {title,description} = req.body;

if(!title){

return res.status(400).json({
message:"Title required"
});
}

const project = await Project.create({
title, description});
res.status(201).json(project);
}

catch(error){
res.status(500).json(error);
}};

const addMember = async(req,res)=>{

try{

const {projectId,userId} = req.body;

const project = await Project.findByPk(projectId);

if(!project){

return res.status(404).json({
message:"Project not found"
});
}

const user = await User.findByPk(userId);

if(!user){

return res.status(404).json({
message:"User not found"
});
}

await project.addUser(user);

res.json({
message:"Member Added Successfully"
});
}

catch(error){
    res.status(500).json(error);
}};

const getProjects = async(req,res)=>{

try{

const projects =
await Project.findAll()

res.json(projects)

}

catch(error){

res.status(500).json(error)

}

}

const deleteProject =
async(req,res)=>{

try{

const {id} = req.params

const project =
await Project.findByPk(id)

if(!project){

return res.status(404).json({

message:"Project not found"

})

}

await project.destroy()

res.json({

message:"Project Deleted"

})

}

catch(error){

res.status(500).json(error)

}

}

module.exports = {
createProject, addMember, getProjects, deleteProject
};