import { useState } from "react"
import axios from "axios"
import {

useNavigate,
Link

}
from "react-router-dom"

import toast from "react-hot-toast"

function Signup(){

const navigate = useNavigate()

const [formData,setFormData] =
useState({

name:"",
email:"",
password:"",
role:"Member"

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

await axios.post(

"http://localhost:5000/api/auth/signup",

formData

)

navigate("/")

}

catch(error){

toast.error("Signup Failed")

}

}

return(

<div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

<div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-12">

<h1 className="text-4xl font-bold text-slate-800">

Create Account

</h1>

<p className="text-slate-500 mt-3">

Start managing your team smarter.

</p>

<form
onSubmit={handleSubmit}
className="mt-10"
>

<input
type="text"
name="name"
placeholder="Name"
className="w-full border rounded-xl p-4 mb-5"
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
className="w-full border rounded-xl p-4 mb-5"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full border rounded-xl p-4 mb-5"
onChange={handleChange}
/>

<select
name="role"
className="w-full border rounded-xl p-4 mb-8"
onChange={handleChange}
>

<option>

Member

</option>

<option>

Admin

</option>

</select>

<button
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-semibold"
>

Create Account

</button>

</form>

<p className="text-center mt-8 text-slate-500">

Already have an account?

<Link

to="/"

className="text-indigo-600 font-semibold ml-2"

>

Login

</Link>

</p>

</div>

</div>

)

}

export default Signup