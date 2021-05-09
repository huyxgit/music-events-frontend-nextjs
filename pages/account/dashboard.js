import Layout from '@/components/Layout'

import DashboardEvent from '@/components/DashboardEvent'

import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'

import styles from '@/styles/Dashboard.module.css'
import { route } from 'next/dist/next-server/server/router'
import { useRouter } from 'next/router'

export default function DashboardPage({ events, token }) {

    const router = useRouter()

    const deleteEvent = async id => {
        if(confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            if(!res.ok) {
                toast.error(data.message)
            } else {
                // router.push('/events')
                router.reload()
            }
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>dashboard </h1>
                <h3>My events</h3>

                {events.map((event) => (
                    <DashboardEvent key={event.id} evt={event} handleDelete={deleteEvent} />
                ))}

            </div>
        </Layout>
    )
}


export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()

    return {
        props: {
            events,
            token
        }
    }
}