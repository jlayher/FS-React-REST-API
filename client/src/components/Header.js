/*Header is a stateless component.
It displays a menu bar for the application and includes 
    buttons for signing in (as long as the user is not currently authenticated)
    buttons for signing up (as long as the user is not currently authenticated)
    the user's name and a button for signing out (when there is an authenticated user)
*/

const Header = () => {
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;