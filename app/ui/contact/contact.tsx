import Image from 'next/image';
import styles from './contact.module.css';

export default function Contact() {
    return (
        <div className={styles.contact}>
            <div className={styles.contact_left}>
                <h2>Contact Us</h2>
                <p>Have questions or need assistance? Get in touch with us!</p>
                <form className={styles.custom_form}>
                    <div className={styles.form_field}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='organization'>Organization Name</label>
                        <input type='text' id='organization' />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='address'>Address</label>
                        <input type='text' id='address' />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='query'>Query</label>
                        <textarea id='query' rows={4}></textarea>
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
                    sizes='(max-width: 640px) 40vw, (max-width: 768px) 40vw, (max-width: 1200px) 5  00px'
                    className={styles.contact_right_img}
                />
            </div>
        </div>
    );
}
