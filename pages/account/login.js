import { FaUser } from 'react-icons/fa'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '@/context/authContext'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error} = useContext(AuthContext)



    useEffect(() => error && toast.error(error))


    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password})

    }

    return (
        <Layout title='Log In'>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Log In
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <input type='submit' value='Login' className="btn" />

                </form>

                <p>
                    Don't have an account? <Link href="/account/register">Sign Up!</Link>
                </p>
            </div>
        </Layout>
    )
}
