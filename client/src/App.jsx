import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import { RouteIndex, RouteLogIn, RouteSignUp } from "./helpers/RouteName"
import Index from "./pages/Index"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout/>}>
         <Route index element={<Index/>}/>
      </Route>
      <Route path={RouteLogIn} element={<LogIn/>}/>
      <Route path={RouteSignUp} element={<SignUp/>}/>
    </Routes>
  )
}

export default App