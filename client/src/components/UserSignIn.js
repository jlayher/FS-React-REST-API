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
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static contextType = UserContext;

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //!!! IMPORTANT!!!
    //This is probably where I will need to push prevHistory to redirect 
    handleSubmit = (event) => {
        event.preventDefault();
        //this line was working
        let context = this.context;
        // const {context} = this.props;
        // const prevPage = this.props.location.state.from.pathname || { from: { pathname: '/' } };
        const prevPage = this.props.history.location.state.from.pathname;
        //const { from } = this.props.location.state || { from: { pathname: '/' } };
        console.log(prevPage);
        // console.log(from.pathname)

        //something weird is going on here.  If I accidentally hit submit when I'm already signed in, authentication fails, 
        //and I am pushed back to the previous page.
        //but if authentication succeeds, I am logged in, but stay on the sign in page.  
        this.props.history.push(prevPage);
        context.signIn(this.state.emailAddress, this.state.password);
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

export default props => (
    <Consumer>
        {context => <UserSignIn {...props} context={context} />}
    </Consumer>
)