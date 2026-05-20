import {

BrowserRouter,

Routes,

Route

}

from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"
import Projects from "./pages/Projects"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

function App(){

return(

<BrowserRouter>

<Toaster
position="top-right"
/>

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/signup"
element={<Signup/>}
/>

<Route
path="/dashboard"
element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}
/>

<Route
path="/tasks"
element={

<ProtectedRoute>

<Tasks/>

</ProtectedRoute>

}
/>

<Route

path="/create-task"

element={

<ProtectedRoute>

{

JSON.parse(
localStorage.getItem("user")
)?.role==="Admin"

?

<CreateTask/>

:

<Dashboard/>

}

</ProtectedRoute>

}

/>

<Route
path="/projects"
element={

<ProtectedRoute>

<Projects/>

</ProtectedRoute>

}
/>

</Routes>

</BrowserRouter>

)

}

export default App