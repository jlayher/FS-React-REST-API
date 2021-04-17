/*Header is a stateless component.
It displays a menu bar for the application and includes 
    buttons for signing in (as long as the user is not currently authenticated)
    buttons for signing up (as long as the user is not currently authenticated)
    the user's name and a button for signing out (when there is an authenticated user)
*/
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;