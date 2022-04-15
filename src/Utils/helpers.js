import cogoToast from 'cogo-toast';
import Compressor from 'compressorjs';

export const authRoutes = (routes=[]) => routes.filter(route => route.authRoute);
export const protectedRoutesWithNav = (routes=[]) => routes.filter(route => route.protected && route.nav);
export const notProtectedRoutesWithNav = (routes=[]) => routes.filter(route => !route.protected && route.nav);


export const getFieldError = (errors=[], field) => {
    return Array.isArray(errors) && errors?.filter(error => error.key === field)[0]?.message;
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

export const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    let compressed;
    let preview;
    if(file){
        const compress = new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.5,
                success(result) {
                    resolve(result);
                }
            });
        })
        const readFile = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
        });
        return Promise.all([compress, readFile]).then(values => {
            compressed = values[0];
            preview = values[1];
            return { file: compressed, preview };
        })
    };
}