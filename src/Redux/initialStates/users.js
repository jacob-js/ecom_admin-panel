const users = {
    currentUser: {
        loading: false,
        error: null,
        data: {},
        auth: null
    },
    login: {
        loading: false,
        error: null,
        data: {}
    },
    signup: {
        loading: false,
        error: null,
        data: {}
    },
    users: {
        loading: false,
        error: null,
        data: {},
        rows: [],
        count: 0
    },
    admins: {
        loading: false,
        error: null,
        data: []
    },
    createAdmin: {
        loading: false,
        error: null,
        data: {}
    },
    deleteAdmin: {
        loading: false,
        error: null,
        id: null
    }
}

export default users;