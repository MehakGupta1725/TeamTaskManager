import { useEffect,useState } from "react"
import axios from "axios"
import Layout from "../components/Layout"

import {

FaTasks,
FaCheckCircle,
FaClock,
FaExclamationTriangle

}
from "react-icons/fa"

function Dashboard(){

const [data,setData] =
useState({})

useEffect(()=>{

fetchDashboard()

},[])

const fetchDashboard =
async()=>{

try{

const token =
localStorage.getItem("token")

const response =
await axios.get(

"https://teamtaskmanager-2gjg.onrender.com/api/tasks/dashboard",

{

headers:{
Authorization:token
}

}

)

setData(response.data)

}

catch(error){

console.log(error)

}

}

const cards = [

{
title:"Total Tasks",
value:data.total || 0,
icon:<FaTasks/>,
bg:"bg-indigo-500"
},

{
title:"Completed",
value:data.completed || 0,
icon:<FaCheckCircle/>,
bg:"bg-emerald-500"
},

{
title:"Pending",
value:data.pending || 0,
icon:<FaClock/>,
bg:"bg-amber-500"
},

{
title:"Overdue",
value:data.overdue || 0,
icon:<FaExclamationTriangle/>,
bg:"bg-red-500"
}

]

return(

<Layout>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

{

cards.map((card,index)=>(

<div

key={index}

className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"

>

<div className="flex justify-between items-center">

<div>

<p className="text-slate-500 font-medium">

{card.title}

</p>

<h2 className="text-5xl font-bold text-slate-800 mt-4">

{card.value}

</h2>

</div>

<div className={`${card.bg} text-white p-5 rounded-2xl text-2xl`}>

{card.icon}

</div>

</div>

</div>

))

}

</div>

<div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold text-slate-800 mb-4">

Performance Overview

</h2>

<p className="text-slate-500 leading-8">

Monitor team productivity, track deadlines,
and manage project execution from a single dashboard.

</p>

</div>

</Layout>

)

}

export default Dashboard