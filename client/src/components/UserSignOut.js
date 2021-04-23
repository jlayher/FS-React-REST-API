/* UserSignOut is a stateless component that does not render any
visual elements.  It simply signs out the authenticated user and redirects the 
client to the course list
*/

import React, { useContext } from 'react';
import {Consumer} from './context';
import {UserContext} from './context';
import {Redirect} from 'react-router-dom'



//Creates the same error as using Consumer did
export default function UserSignOut() {
    const userContext = useContext(UserContext)
    userContext.signOut();
    return(
        <Redirect to='/' />
    )
}


//Using Consumer
/* Note, this causes an error in the console, however, the code works as expected.
    Not sure how to remove this error:
        "Cannot update during an existing state transition (such as within `render`).
        Render methods should be a pure function of props and state."*/
// const UserSignOut = (props) => {
//     return(
//         <>
//         <Consumer>
//             {context => context.signOut()}
//         </Consumer>

//         <Redirect to='/' />
//         </>
//     )
// }

//export default UserSignOut;