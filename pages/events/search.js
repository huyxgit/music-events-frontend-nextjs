import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import qs from 'qs'
import { useRouter, UseRouter } from 'next/router'

import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
    const router = useRouter()

    console.log(events)
    return (
        <Layout title='Search results'>
            <Link href='/'>Go back</Link>
            <h1>Search for {router.query.term}</h1>
            {events.length === 0 && <h3>Nothing to show</h3>}

            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        _where: {
            _or:[
                {name_contains: term},
                {performers_contains: term},
                {description_contains: term},
                {venue_contains: term},

            ]
        }
    })

    const response = await fetch(`${API_URL}/events?${query}`)

    const events = await response.json()

    return {
        props: { events },
        // revalidate: 1
    }
}