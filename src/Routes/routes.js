import { Login, Signup } from '../Components'

export const routes = [
    {
        name: 'Login',
        path: '/login',
        component: Login,
        exact: true,
        protected: false,
        authRoute: true
    },
    {
        name: 'Signup',
        path: '/signup',
        component: Signup,
        exact: true,
        protected: false,
        authRoute: true
    }
]