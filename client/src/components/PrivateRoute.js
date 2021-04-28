import React from "react";
import { Route, Redirect } from "react-router-dom"
import { Consumer } from "./context";

//  Creates private routes for the /courses/create and /courses/:id/update routes.
//  Only available to properly authenticated users
function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Consumer>
        {context => (
          <Route
            {...rest}
              render={ props => 
                context.state.isAuthenticated ? (
                  <Component {...props} />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/signin",
                      state: { from: props.location }
                    }}
                  />
                )
              }
            />
        )}
      </Consumer>
    );
  }

export default PrivateRoute;