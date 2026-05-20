const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async(req,res)=>{

try{

const {name,email,password,role} = req.body;

if(!name || !email || !password){

return res.status(400).json({
message:"All fields required"
});

}

const existingUser = await User.findOne({
where:{email}
});

if(existingUser){

return res.status(400).json({
message:"Email already exists"
});

}

const hashedPassword =
await bcrypt.hash(password,10);

const user = await User.create({

name,
email,
password:hashedPassword,
role

});

res.status(201).json({

message:"Signup Successful",
user

});

}

catch(error){

res.status(500).json(error);

}

};

const login = async(req,res)=>{

try{

const {email,password} = req.body;

if(!email || !password){

return res.status(400).json({
message:"All fields required"
});

}

const user = await User.findOne({
where:{email}
});

if(!user){

return res.status(400).json({
message:"Invalid Email"
});

}

const isMatch =
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res.status(400).json({
message:"Invalid Password"
});

}

const token = jwt.sign(

{
id:user.id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);

res.status(200).json({

message:"Login Successful",

token,

user

});

}

catch(error){

res.status(500).json(error);

}

};

const getUsers = async(req,res)=>{

try{

const users =
await User.findAll({

attributes:[
"id",
"name",
"email",
"role"
]

})

res.json(users)

}

catch(error){

res.status(500).json(error)

}

}

module.exports = {signup,login, getUsers};