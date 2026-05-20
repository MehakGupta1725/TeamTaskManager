import { useState } from "react"
import axios from "axios"
import {useNavigate, Link}
from "react-router-dom"
import toast from "react-hot-toast"

function Login(){

const navigate = useNavigate()


const [formData,setFormData] =
useState({

email:"",
password:""

})

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

const response =
await axios.post(

"http://localhost:5000/api/auth/login",

formData

)

localStorage.setItem(
"token",
response.data.token
)

localStorage.setItem(

"user",

JSON.stringify(
response.data.user
)

)
toast.success("Login Successful")

navigate("/dashboard")

}

catch(error){

toast.error("Invalid credentials")
}

}

return(

<div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

<div className="grid lg:grid-cols-2 w-full max-w-6xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">

{/* LEFT PANEL */}

<div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 text-white">

<h1 className="text-6xl font-bold leading-tight">

TaskFlow

</h1>

<p className="mt-8 text-lg text-slate-200 leading-8">

Organize projects, assign tasks,
and manage team productivity
through a modern workflow platform.

</p>

</div>

{/* RIGHT PANEL */}

<div className="bg-white p-12">

<h2 className="text-4xl font-bold text-slate-800">

Welcome Back

</h2>

<p className="text-slate-500 mt-3">

Sign in to continue.

</p>

<form
onSubmit={handleSubmit}
className="mt-10"
>

<input

type="email"

name="email"

placeholder="Email"

className="w-full border border-slate-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"

onChange={handleChange}

/>

<input

type="password"

name="password"

placeholder="Password"

className="w-full border border-slate-300 rounded-xl p-4 mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"

onChange={handleChange}

/>

<button

className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-semibold transition-all"

>

Sign In

</button>

</form>

<p className="text-slate-500 mt-8 text-center">

Don't have an account?

<Link

to="/signup"

className="text-indigo-600 font-semibold ml-2"

>

Signup

</Link>

</p>

</div>

</div>

</div>

)

}

export default Login