import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from '../Components';
import { authRoutes, notProtectedRoutesWithNav, protectedRoutesWithNav } from '../Utils/helpers';
import { routes } from './routes';

function Routes() {
  return (
    // loading ? <PageLoader />:
        <Switch>
            {
                authRoutes(routes).map((route, index) =>(
                    <Route exact path={route.path} key={index} render={ () =><route.component /> } />
                ))
            }
            <Nav>
                {
                    notProtectedRoutesWithNav(routes).map((route, index) =>(
                        <Route path={route.path} exact={route.exact} key={index} render={ () =><route.component /> } />
                    ))
                }
                {
                    protectedRoutesWithNav(routes).map((route, index) =>(
                        // <ProtectedRoute route={route} key={index} />
                        <Route path={route.path} exact={route.exact} key={index} render={ () =><route.component /> } />
                    ))
                }
            </Nav>
        </Switch>
  )
}

export default Routes;