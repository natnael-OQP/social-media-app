export const Reducer = (state, action) => {
    switch (action.type) {
        case 'Login_Start':
            return {
                user: null,
                isLoading: true,
                isError: false,
            }
        case 'Login_Success':
            return {
                user: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'Login_Failure':
            return {
                user: false,
                isLoading: false,
                isError: true,
            }
        case 'Logout':
            return {
                user: null,
                isLoading: false,
                isError: false,
            }
        default:
            return
    }
}
