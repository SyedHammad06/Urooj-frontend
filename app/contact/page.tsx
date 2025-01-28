'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Navigation from '../ui/nav/nav';
import Footer from '../ui/footer/footer';
import { useSearchParams } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    organizationName: string;
    address: string;
    query: string;
}

export default function Contact() {
    const query = useSearchParams();
    const id = query?.get('id') || '';
    const [formData, setFormData] = useState<FormData>({
        name: '',
        organizationName: '',
        address: '',
        query: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch(
                'https://localhost:7102/api/Urooj/Subscription',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({
                    name: '',
                    organizationName: '',
                    address: '',
                    query: '',
                });
            } else {
                const errorData = await response.json();
                alert(`Failed to submit: ${errorData.message}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <>
            <Navigation id={id} />
            <div className={styles.contact}>
                <div className={styles.contact_left}>
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or need assistance? Get in touch with us!
                    </p>
                    <form
                        className={styles.custom_form}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.form_field}>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor='organizationName'>
                                Organization Name
                            </label>
                            <input
                                type='text'
                                id='organizationName'
                                value={formData.organizationName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                id='address'
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor='query'>Query</label>
                            <textarea
                                id='query'
                                rows={4}
                                value={formData.query}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type='submit' className={styles.submit_button}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className={styles.contact_right}>
                    <Image
                        src='/pic-3.jpg'
                        alt='contact display image'
                        width={500}
                        height={500}
                        style={{ width: 'auto', height: 'auto' }}
                        sizes='(max-width: 640px) 40vw, (max-width: 768px) 40vw, (max-width: 1200px) 500px'
                        className={styles.contact_right_img}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}
