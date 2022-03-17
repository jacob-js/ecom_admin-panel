import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';

function Routes() {
  return (
    // loading ? <PageLoader />:
        <Switch>
            {/* {
                authRoutes.map((route, index) =>(
                    <Route exact path={route.path} key={index} render={ () =><route.component /> } />
                ))
            }
            <Nav>
                {
                    notProtectedRoutesWithNav.map((route, index) =>(
                        <Route path={route.path} exact={route.exact} key={index} render={ () =><route.component /> } />
                    ))
                }
                {
                    protectedRoutesWithNav.map((route, index) =>(
                        <ProtectedRoute route={route} key={index} />
                    ))
                }
            </Nav> */}
            {
                routes.map((route, index) =>(
                    <Route exact path={route.path} key={index} render={ () =><route.component /> } />
                ))
            }
        </Switch>
  )
}

export default Routes;