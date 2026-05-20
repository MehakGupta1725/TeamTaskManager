import {
useEffect,
useState
}
from "react"

import axios from "axios"

import Layout
from "../components/Layout"

function CreateTask(){

const [projects,setProjects] =
useState([])

const [users,setUsers] =
useState([])

const [formData,setFormData] =
useState({

title:"",
description:"",
projectId:"",
assignedTo:"",
dueDate:""

})

useEffect(()=>{

fetchProjects()
fetchUsers()

},[])

const token =
localStorage.getItem("token")

const fetchProjects=
async()=>{

try{

const response =
await axios.get(

"https://teamtaskmanager-2gjg.onrender.com/api/projects",

{

headers:{
Authorization:token
}

}

)

setProjects(
response.data
)

}

catch(error){

console.log(error)

}

}

const fetchUsers=
async()=>{

try{

const response =
await axios.get(

"https://teamtaskmanager-2gjg.onrender.com/api/auth/users",

{

headers:{
Authorization:token
}

}

)

setUsers(
response.data
)

}

catch(error){

console.log(error)

}

}

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

})

}

const handleSubmit=
async(e)=>{

e.preventDefault()

try{

await axios.post(

"https://teamtaskmanager-2gjg.onrender.com/api/tasks",

formData,

{

headers:{
Authorization:token
}

}

)

toast.success("Task Created Successfully")

setFormData({

title:"",
description:"",
projectId:"",
assignedTo:"",
dueDate:""

})

}

catch(error){

toast.error("Creation Failed")

}

}

return(

<Layout>

<div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

<h1 className="text-4xl font-bold text-slate-800">

Create Task

</h1>

<p className="text-slate-500 mt-3">

Assign tasks efficiently to your team.

</p>

<form
onSubmit={handleSubmit}
className="mt-10 grid md:grid-cols-2 gap-6"
>

<input
type="text"
name="title"
placeholder="Task Title"
value={formData.title}
className="border rounded-xl p-4"
onChange={handleChange}
/>

<input
type="date"
name="dueDate"
value={formData.dueDate}
className="border rounded-xl p-4"
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Description"
value={formData.description}
className="border rounded-xl p-4 md:col-span-2"
rows="5"
onChange={handleChange}
/>

<select
name="projectId"
value={formData.projectId}
className="border rounded-xl p-4"
onChange={handleChange}
>

<option value="">

Select Project

</option>

{

projects.map((project)=>(

<option
key={project.id}
value={project.id}
>

{project.title}

</option>

))

}

</select>

<select
name="assignedTo"
value={formData.assignedTo}
className="border rounded-xl p-4"
onChange={handleChange}
>

<option value="">

Assign User

</option>

{

users.map((user)=>(

<option
key={user.id}
value={user.id}
>

{user.name} ({user.role})

</option>

))

}

</select>

<button
className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-4 font-semibold transition-all"
>

Create Task

</button>

</form>

</div>

</Layout>

)

}

export default CreateTask