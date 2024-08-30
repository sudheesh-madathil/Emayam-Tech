
import { Register } from "../Register/Register"
import "./Home.css"
const Home =()=>{

    return(
        <>
        <div className="homemain">
            <div className="img">
                <img src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg" alt="img" />

            </div>
            <div className="loginsection">
                <Register/>
   

            </div>

        </div>

        </>

    )
}
export{Home}