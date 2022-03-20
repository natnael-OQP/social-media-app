import { createContext, useEffect, useReducer } from 'react'
import { Reducer } from './Reducer'

const initialize_state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    isError: false,
}

export const context = createContext(initialize_state)

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialize_state)
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return (
        <context.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                isError: state.isError,
                dispatch,
            }}
        >
            {children}
        </context.Provider>
    )
}
