import { Route, Routes } from "react-router-dom";
import { Home } from "./componnets/Home/Home"
import { Userhome } from "./componnets/userhome/Userhome";
import { Adminhome } from "./componnets/AdminHome/AdminHome";
import { Managerhome } from "./componnets/ManagerHome/ManagerHome";

// import { Register } from "./componnets/Register/Register"


function App() {


  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user-home/:userId" element={<Userhome />} />
    <Route path="/admin-home/:userId" element={<Adminhome/>} />
    <Route path="/manager-home/:userId" element={<Managerhome/>} />

    </Routes>
 
    {/* <Register/> */}

    </>
  )
}

export default App
