import { createContext, useState, useEffect } from 'react'
import { useRouter} from 'next/router'
import {API_URL, NEXT_URL} from '@/config/index'


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter()


    useEffect(() =>  checkUserLoggedIn(), [])

    // register user
    const register = async (user) => {
        // console.log({identifier, password})
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
        // console.log(data)
        if(res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
    }

    // log in
    const login = async ({email:identifier, password}) => {
        // console.log({identifier, password})
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier, password
            })
        })

        const data = await res.json()
        // console.log(data)
        if(res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }

    }

    // log out
    const logout = async () => {
        // console.log('log out')
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })

        if(res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    // check if user is logged in
    const checkUserLoggedIn = async (user) => {
        // console.log('Check')
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if(res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext