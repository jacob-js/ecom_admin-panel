import { Dashboard, Login, Signup } from '../Components'
import Products from '../Components/Pages/Products'

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
    },
    {
        name: 'Dashboard',
        path: '/',
        component: Dashboard,
        exact: true,
        protected: true,
        nav: true
    },
    {
        name: 'Products',
        path: '/products',
        component: Products,
        exact: true,
        protected: true,
        nav: true
    }
]