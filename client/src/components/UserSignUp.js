/*
The UserSignUp Component renders the "Sign Up" page by
rendering a form, allowing the user to create a new account.
The component also renders a "Sign Up" button that creates a POST Request
to the API's "/api/users" route, and signs in the user.
The component also renders a "Cancel" button that returns the client to the course list
*/

import React, {Component} from 'react';

export default class UserSignUp extends Component {
    render(){
        return(
            <main>
                <div class="form--centered">
                    <h2>Sign Up</h2>
                    
                    {/* <form>
                        <label for="name">Name</label>
                        <input id="name" name="name" type="text" value="">
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value="">
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" value="">
                        <label for="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value="">
                        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form> */}
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
                </div>
            </main>
        );
    }
}
