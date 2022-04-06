import cogoToast from 'cogo-toast';

export const authRoutes = (routes=[]) => routes.filter(route => route.authRoute);
export const protectedRoutesWithNav = (routes=[]) => routes.filter(route => route.protected && route.nav);
export const notProtectedRoutesWithNav = (routes=[]) => routes.filter(route => !route.protected && route.nav);


export const getFieldError = (errors, field) => {
    return errors?.filter(error => error.key === field)[0]?.message;
}

export function useQuery(location) {
    return new URLSearchParams(location.search);
};

export const sendNotif = ( msg, type='success', pos='top-right') => {
    return cogoToast[type](msg, {
        position: `${pos}`,
        bar: { size: '6px' },
        hideAfter: 5,
    });
}