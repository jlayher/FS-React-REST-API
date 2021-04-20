/* UserSignOut is a stateless component that does not render any
visual elements.  It simply signs out the authenticated user and redirects the 
client to the course list
*/

import React from 'react';
import {Consumer} from './context';
import {Redirect} from 'react-router-dom'

const UserSignOut = (props) => {
    return(
        <>
        <Consumer>
            {context => context.signOut()}
        </Consumer>

        <Redirect to='/' />
        </>
    )
}

export default UserSignOut;