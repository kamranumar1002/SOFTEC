import React from "react";
import { Link } from "react-router-dom";
import ClientSignupform from "./ClientSignupform";



const Signup = () => {
    return ( <>
    
    <div>
    <Link to="/clientSignup">
       <button className="signupbuttons">
         sign up as a client

       </button>
       </Link >
       <Link to="/creatorSignup">
       <button className="signupbuttons">
        sign up as a creator
        </button>
        </Link>
    </div>
    
    </> );
}
 
export default Signup;


