const products = {
    products: {
        loading: false,
        error: null,
        data: {},
        rows: [],
        count: 0
    },
    createProduct: {
        loading: false,
        error: null,
        data: {}
    },
    deleteProd: {
        loading: false,
        error: null,
        msg: null,
        id: null
    },
    updateProduct: {
        loading: false,
        error: null,
        data: {}
    }
};

export default products;