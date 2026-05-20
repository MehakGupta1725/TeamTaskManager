const user = JSON.parse(
localStorage.getItem("user")
)
import { useEffect,useState }
from "react"

import axios from "axios"

import Layout
from "../components/Layout"

import {

FaFolderOpen,
FaTrash

}
from "react-icons/fa"

import toast from "react-hot-toast"



function Projects(){

const [projects,setProjects] =
useState([])

const [formData,setFormData] =
useState({

title:"",
description:""

})

useEffect(()=>{

fetchProjects()

},[])

const fetchProjects=
async()=>{

try{

const token =
localStorage.getItem("token")

const response =
await axios.get(

"https://teamtaskmanager-2gjg.onrender.com/api/projects",

{

headers:{

Authorization:token

}

}

)

setProjects(response.data)

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

const token =
localStorage.getItem("token")

await axios.post(

"https://teamtaskmanager-2gjg.onrender.com/api/projects",

formData,

{

headers:{

Authorization:token

}

}

)

setFormData({

title:"",
description:""

})

fetchProjects()

}

catch(error){

toast.error("Failed")

}

}

const handleDelete=
async(id)=>{

try{

const token =
localStorage.getItem("token")

const confirmed = window.confirm(
"Delete this project?"
)

if(!confirmed){

return

}
await axios.delete(

`https://teamtaskmanager-2gjg.onrender.com/api/projects/${id}`,

{

headers:{

Authorization:token

}

}

)

fetchProjects()

}

catch(error){

console.log(error)

}

}

return(

<Layout>

<div className="grid lg:grid-cols-3 gap-8">

{/* FORM */}

{

user?.role?.toLowerCase()
==="admin"

? (

<div className="bg-white rounded-3xl shadow-xl p-8">

<h1 className="text-3xl font-bold text-slate-800">

Create Project

</h1>

<p className="text-slate-500 mt-2">

Launch a new project workspace.

</p>

<form
onSubmit={handleSubmit}
className="mt-8"
>

<input
type="text"
name="title"
placeholder="Project Title"
value={formData.title}
className="w-full border rounded-xl p-4 mb-5"
onChange={handleChange}
/>

<textarea
name="description"
placeholder="Description"
value={formData.description}
className="w-full border rounded-xl p-4 mb-6"
rows="5"
onChange={handleChange}
/>

<button
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-semibold transition-all"
>

Create Project

</button>

</form>

</div>

)

: null

}
{/* PROJECTS */}

<div className="lg:col-span-2">

<h1 className="text-3xl font-bold text-slate-800 mb-8">

Projects

</h1>

<div className="grid md:grid-cols-2 gap-6">

{

projects.length===0

?

<div className="bg-white rounded-3xl shadow-lg p-12 text-center">

<h2 className="text-2xl font-bold text-slate-700">

No Projects Yet

</h2>

<p className="text-slate-500 mt-3">

Create your first project workspace.

</p>

</div>

:

projects.map((project)=>(

<div

key={project.id}

className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all"

>

<div className="flex justify-between items-start">

<div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">

<FaFolderOpen/>

</div>

{

user?.role?.toLowerCase()
==="admin"

&&

<button
onClick={()=>
handleDelete(project.id)
}
className="text-red-500 hover:text-red-700"
>

<FaTrash/>

</button>

}

</div>

<h2 className="text-2xl font-bold text-slate-800 mt-6">

{project.title}

</h2>

<p className="text-slate-500 mt-4 leading-7">

{project.description}

</p>

</div>

))

}

</div>

</div>

</div>

</Layout>

)

}

export default Projects