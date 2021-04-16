/*
The UserSignUp Component renders the "Sign Up" page by
rendering a form, allowing the user to create a new account.
The component also renders a "Sign Up" button that creates a POST Request
to the API's "/api/users" route, and signs in the user.
The component also renders a "Cancel" button that returns the client to the course list
*/

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //handleSubmit Function
        //When the submit button is clicked 
            //check if this.state.password === this.state.confirmPassword
                //if true:  
                    //make axios POST request to the /api/users route
                    //sign in the user (come back to this part once authentication and cookies are in place)
                //if false
                    //render a window that alerts the user that their passwords don't match
                    //cancel the submission
                    //setState of password and confirmPassword to empty strings (persist the name and email input's state)

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/users';
        if (this.state.password === this.state.confirmPassword) {
            axios.post(url, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password
            // })
            // .then(res => {
                //create a "signIn()" function within App and bind it to the constructor so it gets sent down via props

                // this.props.signIn(this.state.emailAddress, this.state.password)
                // this.props.history.push('/');
            })
        } else {
            window.alert("Your Password does not match your Confirmed Password");
        }
    }

    render(){
        return(
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    
                    <form>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.handleChange}/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
                        {/* onSubmit={this.handleSubmit} */}
                        <button className="button" type="submit">Sign Up</button>
                        <NavLink className="button button-secondary" to="/">Cancel</NavLink>
                    </form>
                    <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
                </div>
            </main>
        );
    }
}
