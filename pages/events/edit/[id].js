import { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import Modal from '@/components/Modal'
import Image from 'next/image'
import {FaImage} from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

import Layout from '@/components/Layout'

export default function EditEventPage({ evt }) {
    const router = useRouter()

    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    })

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some(element => element === '');
        if (hasEmptyFields) {
            toast.error('please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if(!res.ok) {
            toast.error('Something went wrong!')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
        

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })

    }

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/events/${evt.id}`)

        const data = await res.json()

        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)

    }

    return (
        <Layout title='Add new event'>
            <Link href='/'>
                <a>Go back</a>
            </Link>
            <h1>Edit Event</h1>

            <ToastContainer />

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}></input>
                    </div>

                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input type="text" id="performers" name="performers" value={values.performers} onChange={handleInputChange}></input>
                    </div>

                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id="venue" name="venue" value={values.venue} onChange={handleInputChange}></input>
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={values.address} onChange={handleInputChange}></input>
                    </div>

                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}></input>
                    </div>

                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="text" id="time" name="time" value={values.time} onChange={handleInputChange}></input>
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Update Event" className="btn" />
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : <div>
                <p>No image uploaded</p>
                </div>}

                <div>
                    <button className="btn-secondary" onClick={() => setShowModal(true)}>
                        <FaImage /> Set Image
                    </button>
                </div>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
                </Modal>
        </Layout>
    )
}


export async function getServerSideProps({ params: {id}, req }) {
    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    console.log(req.headers.cookie)

    return {
        props: {
            evt
        }
    }
}