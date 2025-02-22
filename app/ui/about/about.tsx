import Image from 'next/image';
import styles from './about.module.css';
import img1 from '../../../public/Vector.png';
import img2 from '../../../public/Vector-1.png';
import img3 from '../../../public/Vector-2.png';
import img4 from '../../../public/Vector-3.png';

export default function About() {
    return (
        <>
            <div className={styles.features}>
                <div className={styles.features_left}>
                    <Image
                        src='/pic-2.jpg'
                        alt='features display image'
                        width={500}
                        height={500}
                        style={{ width: 'auto', height: 'auto' }}
                        sizes='(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1200px) 500px'
                        className={styles.features_right_img}
                    />
                </div>
                <div className={styles.features_right}>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img1}
                            width={30}
                            height={30}
                            alt='feature 1 icon'
                            className={styles.features_right_icon}
                        />
                        <p>
                            Revolutionizing Early Childhood Education for
                            Pre-Schools Everywhere
                        </p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img2}
                            width={30}
                            height={30}
                            alt='feature 2 icon'
                            className={styles.features_right_icon}
                        />
                        <p>
                            Engaging and Inspiring Young Minds Through
                            Innovation, Creativity, and Exploration
                        </p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img3}
                            width={30}
                            height={30}
                            alt='feature 3 icon'
                            className={styles.features_right_icon}
                        />
                        <p>
                            Trusted by Leading Schools, Dedicated Teachers, and
                            Caring Parents Across Communities
                        </p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img4}
                            width={30}
                            height={30}
                            alt='feature 4 icon'
                            className={styles.features_right_icon}
                            sizes='(max-width: 768px) 1rem'
                        />
                        <p>
                            Providing Premium, Top-Quality Educational Materials
                            for Both Students and Educators
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
