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
    }
}

export default users;