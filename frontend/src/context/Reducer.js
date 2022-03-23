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
        case 'Follow':
            return {
                ...state,
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload],
                },
            }
        case 'unFollow':
            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following?.filter(
                        (following) => following !== action.payload
                    ),
                },
            }
        default:
            return
    }
}
