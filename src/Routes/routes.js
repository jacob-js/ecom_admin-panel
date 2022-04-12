import { Categorys, Dashboard, Login, Orders, ProductDetails, Signup, Staff, Users } from '../Components'
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
    },
    {
        name: 'Product Detail',
        path: '/products/:id',
        component: ProductDetails,
        exact: true,
        protected: true,
        nav: true
    },
    {
        name: 'Categorys',
        path: '/categorys',
        component: Categorys,
        exact: true,
        protected: true,
        nav: true
    },
    {
        name: 'Orders',
        path: '/orders',
        component: Orders,
        exact: true,
        protected: true,
        nav: true
    },
    {
        name: 'Users',
        path: '/users',
        component: Users,
        exact: true,
        protected: true,
        nav: true
    },
    {
        name: 'Staff',
        path: '/staff',
        component: Staff,
        exact: true,
        protected: true,
        nav: true
    }
]