import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function Home({ events }) {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming event</h1>
      {events.length === 0 && <h3>Nothing to show</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View all</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)

  const events = await response.json()

  return {
    props: {events:events},
    // props: {events:events.slice(0,3)},
    // revalidate: 1
  }
}