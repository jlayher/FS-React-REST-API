/*
The UserSignIn Component renders the "Sign In" page.
It renders a form that allows a user to sign in using their existing account info.
It also render a "Sign In" button which allows the user to sign in, as well as
a "Cancel" button that returns the user to the course list
*/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer, UserContext } from './context';

class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {
            emailAddress: '',
            password: '',
            isAuthenticated: '',
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //use context
    static contextType = UserContext;

    //Cancel Button Functionality
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/')
    }

    //Change state for inputs
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //Sign in the user
    handleSubmit = (event) => {
        event.preventDefault();
        let context = this.context;
        if(this.state.emailAddress === "" || this.state.password ==="" ) {
            window.alert("Please Provide Values for both the Email Address, and Password Fields")
        }else {
            context.signIn(this.state.emailAddress, this.state.password);
            this.props.history.goBack()
        }
    }

    render() {
        return(
            <Consumer>
            {context => (
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" placeholder="joesmith@email.com" value={this.state.emailAddress} onChange={this.handleChange}/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" type="button" onClick={this.handleCancel}>Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
                </div>
            )}   
            </Consumer>
        );
    }
}

const UserSignInWithContext = (props) =>{
    return( 
    <Consumer>
        {context => <UserSignIn {...props} context={context} />}
    </Consumer>
    ) 
}
export default UserSignInWithContext;
