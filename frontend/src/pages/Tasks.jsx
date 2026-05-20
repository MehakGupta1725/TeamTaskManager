import { useEffect,useState }
from "react"

import axios from "axios"

import Layout
from "../components/Layout"

function Tasks(){

const [tasks,setTasks] =
useState([])

const [search,setSearch] =
useState("")

const [filter,setFilter] =
useState("All")

useEffect(()=>{

fetchTasks()

},[])

const fetchTasks=
async()=>{

try{

const token =
localStorage.getItem("token")

const response =
await axios.get(

"http://localhost:5000/api/tasks",

{

headers:{

Authorization:token

}

}

)

setTasks(response.data)

}

catch(error){

console.log(error)

}

}

const updateStatus=
async(id,status)=>{

try{

const token =
localStorage.getItem("token")

await axios.patch(

`http://localhost:5000/api/tasks/${id}/status`,

{status},

{

headers:{

Authorization:token

}

}

)

fetchTasks()

}

catch(error){

console.log(error)

}

}

const filteredTasks =

tasks.filter((task)=>{

const matchesSearch =

task.title
.toLowerCase()
.includes(
search.toLowerCase()
)

const matchesFilter =

filter==="All"

||

task.status===filter

return (

matchesSearch

&&

matchesFilter

)

})

const getStatusStyle=(status)=>{

if(status==="Completed"){

return "bg-emerald-100 text-emerald-700"

}

if(status==="In Progress"){

return "bg-amber-100 text-amber-700"

}

return "bg-slate-200 text-slate-700"

}

return(

<Layout>

<div className="bg-white rounded-3xl shadow-xl overflow-hidden">

<div className="p-8 border-b flex flex-col md:flex-row gap-4 justify-between">

<input

type="text"

placeholder="Search Tasks..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="border border-slate-300 rounded-xl p-4 w-full md:w-96"

/>

<select

value={filter}

onChange={(e)=>

setFilter(
e.target.value
)

}

className="border border-slate-300 rounded-xl p-4"

>

<option>

All

</option>

<option>

Todo

</option>

<option>

In Progress

</option>

<option>

Completed

</option>

</select>

</div>
<div className="p-8 border-b">

<h1 className="text-3xl font-bold text-slate-800">

Tasks Management

</h1>

<p className="text-slate-500 mt-2">

Track, update and manage team tasks.

</p>

</div>

<table className="w-full">

<thead className="bg-slate-50">

<tr>

<th className="p-6 text-left">

Task

</th>

<th className="text-left">

Status

</th>

<th className="text-left">

Due Date

</th>

<th className="text-left">

Update

</th>

</tr>

</thead>

<tbody>

{

tasks.length===0

?

<div className="bg-white rounded-3xl shadow-lg p-12 text-center">

<h2 className="text-2xl font-bold text-slate-700">

No Tasks Available

</h2>

<p className="text-slate-500 mt-3">

Create your first task.

</p>

</div>

:

filteredTasks.map((task)=>(

<tr
key={task.id}
className="border-t hover:bg-slate-50 transition-all"
>

<td className="p-6">

<div>

<h2 className="font-bold text-slate-800">

{task.title}

</h2>

<p className="text-slate-500 text-sm mt-1">

{task.description}

</p>

</div>

</td>

<td>

<span className={`

px-4 py-2 rounded-full text-sm font-semibold

${getStatusStyle(task.status)}

`}>

{task.status}

</span>

</td>

<td className="text-slate-600">

{

task.dueDate

?

new Date(
task.dueDate
).toLocaleDateString()

:

"No Date"

}

</td>

<td>

<select

value={task.status}

onChange={(e)=>

updateStatus(
task.id,
e.target.value
)

}

className="border border-slate-300 rounded-xl p-3"

>

<option>

Todo

</option>

<option>

In Progress

</option>

<option>

Completed

</option>

</select>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</Layout>

)

}

export default Tasks