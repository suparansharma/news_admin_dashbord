export const USER_END_POINT = {
    create: () => `/register`,
    get: () => `/user`,
    info: (id) => `/user/${id}`,
    update: (id) => `/user/${id}`,
    delete:(id) => `/user/${id}`,
}