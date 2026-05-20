import {
useState,
useEffect
}
from "react"

import {
Link,
useLocation,
useNavigate
}
from "react-router-dom"

import {

FaChartPie,
FaFolder,
FaTasks,
FaPlusCircle,
FaSignOutAlt

}
from "react-icons/fa"

function Layout({children}){

const navigate = useNavigate()
const user = JSON.parse(

localStorage.getItem("user")

)

const location = useLocation()
const [darkMode,setDarkMode] =
useState(false)

useEffect(()=>{

const savedMode =

localStorage.getItem(
"darkMode"
)

if(savedMode==="true"){

setDarkMode(true)

}

},[])

const toggleDarkMode=()=>{

const newMode =
!darkMode

setDarkMode(newMode)

localStorage.setItem(
"darkMode",
newMode
)

}
const handleLogout=()=>{

localStorage.removeItem("token")
localStorage.removeItem("user")

navigate("/")

}

const menuItems = [

{
name:"Dashboard",
path:"/dashboard",
icon:<FaChartPie/>
},

{
name:"Projects",
path:"/projects",
icon:<FaFolder/>
},

{
name:"Tasks",
path:"/tasks",
icon:<FaTasks/>
}

]

if(user?.role==="Admin"){

menuItems.push({

name:"Create Task",

path:"/create-task",

icon:<FaPlusCircle/>

})

}

return(

<div className={`

flex min-h-screen

${

darkMode

?

"bg-slate-950"

:

"bg-slate-100"

}

`}>

{/* SIDEBAR */}

<div className="w-72 bg-slate-900 text-white flex flex-col justify-between shadow-2xl">

<div>

<div className="p-8 border-b border-slate-800">

<h1 className="text-3xl font-bold tracking-wide text-indigo-400">

TaskFlow

</h1>

<p className="text-slate-400 text-sm mt-2">

Team Management System

</p>

</div>

<nav className="p-6 flex flex-col gap-3">

{

menuItems.map((item)=>(

<Link

key={item.path}

to={item.path}

className={`

flex items-center gap-4
p-4 rounded-xl
transition-all duration-200

${

location.pathname===item.path

?

"bg-indigo-600 shadow-lg"

:

"hover:bg-slate-800 text-slate-300"

}

`}

>

<span className="text-lg">

{item.icon}

</span>

<span className="font-medium">

{item.name}

</span>

</Link>

))

}

</nav>

</div>

<div className="p-6">

<button

onClick={handleLogout}

className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all p-4 rounded-xl font-semibold"

>

<FaSignOutAlt/>

Logout

</button>

</div>

</div>

{/* MAIN CONTENT */}

<div className="flex-1 p-10 overflow-auto">

{/* HEADER */}

<div className="mb-10 flex justify-between items-center">
<button

onClick={toggleDarkMode}

className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-all"

>

{

darkMode

?

"☀ Light"

:

"🌙 Dark"

}

</button>
<div>

<h1 className="text-4xl font-bold text-slate-800">

Welcome Back 👋

</h1>

<p className="text-slate-500 mt-2">

Manage your projects efficiently.

</p>

</div>

<div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow">

<div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">

{

user?.name?.charAt(0)

?.toUpperCase()

||
"G"

}

</div>

<div>

<p className="font-bold text-slate-800">

{

user?.name ||

"Guest"

}

</p>

<p className="text-slate-500 text-sm">

{

user?.role ||

"User"

}

</p>

</div>

</div>

</div>

{children}

</div>

</div>

)

}

export default Layout