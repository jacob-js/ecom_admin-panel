import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Nav } from '../Components';
import { getCurrentUserAction } from '../Redux/actions/users';
import { authRoutes, notProtectedRoutesWithNav, protectedRoutesWithNav } from '../Utils/helpers';
import { PageLoader } from '../Utils/loaders';
import { routes } from './routes';

const ProtectedRoute = ({ route }) => {
    const { auth } = useSelector(({ users: { currentUser } }) => currentUser);
    const history = useHistory();
    return(
        <Route exact path={route.path} render={() =>(
            auth === false ? 
            history.push({ pathname: '/login', state: { from: history.location.pathname } }):
            <route.component />
        )} />
    )
}

function Routes() {
    const { loading, auth } = useSelector(({ users: { currentUser } }) => currentUser);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
        getCurrentUserAction(dispatch)
    }, [dispatch]);
    
  return (
    loading ? <PageLoader />:
        <Switch>
            {
                authRoutes(routes).map((route, index) =>(
                    <Route exact path={route.path} key={index} render={ () =>(
                        auth === true ? history.push('/'):
                        <route.component />
                    ) } />
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
                        <ProtectedRoute route={route} key={index} />
                    ))
                }
            </Nav>
        </Switch>
  )
}

export default Routes;