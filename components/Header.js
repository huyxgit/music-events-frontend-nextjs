import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

import { useContext } from 'react'
import AuthContext from '@/context/authContext'

export default function Header() {
    const { user, logout } = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>DJ Events</a>
                </Link>
            </div>

            <Search />

            <nav>
                <ul>

                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>

                    {/* // show add event button only when user logged in */}
                    {user ? <>
                        <li>
                            <Link href='/events/add'>
                                <a>Add Event</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/account/dashboard'>
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <button className="btn-secondary btn-icon" onClick={() => logout()}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </> : <>
                        <li>
                            <Link href='/account/login'>
                                <a className='btn-secondary btn-icon'>
                                    <FaSignInAlt />Log In
                            </a>
                            </Link>
                        </li>
                    </>}
                    {/* // when user logged in, hide login button */}




                </ul>
            </nav>

        </header>
    )
}