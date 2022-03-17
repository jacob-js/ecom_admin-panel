// import {routes} from "../Routes/routes";

// export const authRoutes = routes.filter(route => route.authRoute);
// export const protectedRoutesWithNav = routes.filter(route => route.protected && route.nav);
// export const notProtectedRoutesWithNav = routes.filter(route => !route.protected && route.nav);


export const getFieldError = (errors, field) => {
    return errors?.filter(error => error.key === field)[0]?.message;
}

export function useQuery(location) {
    return new URLSearchParams(location.search);
}