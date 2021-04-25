/*
The UserSignIn Component renders the "Sign In" page.
It renders a form that allows a user to sign in using their existing account info.
It also render a "Sign In" button which allows the user to sign in, as well as
a "Cancel" button that returns the user to the course list
*/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './context';

export default class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {
            emailAddress: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
//figure this part out with the sign in, redirecting with history, and getting the buttons to work correctly
//not sure if treehouse is cool with the buttons being nested in NavLinks, even though they work fine
    render() {
        return(
            <Consumer>
            {context => (
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <form onSubmit={() => context.signIn(this.state.emailAddress, this.state.password)}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" placeholder="joesmith@email.com" value={this.state.emailAddress} onChange={this.handleChange}/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
                        {/* Change from NavLink to buttons */}
                        {/* <NavLink to='/'><button className="button" type="submit">Sign In</button></NavLink>
                        <NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink> */}
                        <NavLink to='/' className="button" onClick={() => context.signIn(this.state.emailAddress, this.state.password)} >Sign In</NavLink>
                        <NavLink className="button button-secondary" to="/">Cancel</NavLink>
                    </form>
                    <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
                </div>
            )}   
            </Consumer>
        );
    }
}
