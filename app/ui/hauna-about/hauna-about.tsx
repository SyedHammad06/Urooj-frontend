import Image from 'next/image';
import styles from './hauna-about.module.css';
import img1 from '../../../public/Vector.png';
import img2 from '../../../public/Vector-1.png';
import img3 from '../../../public/Vector-4.png';
import img4 from '../../../public/Vector-5.png';
import img5 from '../../../public/Vector-6.png';
import img6 from '../../../public/Vector-7.png';

export default function About() {
    return (
        <>
            <div className={styles.about} id='#about'>
                <div className={styles.about_left}>
                    <h2>Overview of Hauna</h2>
                    <p>
                        Hauna Preschool Systems is a comprehensive educational
                        program designed to ensure the holistic development of
                        young learners. The system emphasizes nurturing a
                        child&apos;s body, heart, mind, and soul through
                        innovative, activity-based learning methods.
                    </p>
                    <h3>Key Highlights</h3>
                    <div className={styles.about_left_key}>
                        <ul>
                            <li>
                                <h4>Embrace Play-Based Learning</h4>
                                <p>
                                    Play is a child&apos;s natural mode of
                                    learning. It fosters creativity,
                                    problem-solving, and social skills.
                                </p>
                            </li>
                            <li>
                                <h4>
                                    Prioritize Social-Emotional Development:
                                </h4>
                                <p>
                                    Strong social-emotional skills are essential
                                    for building positive relationships and
                                    managing emotions.
                                </p>
                            </li>
                            <li>
                                <h4>Foster Literacy and Numeracy Skills</h4>
                                <p>
                                    Early literacy and numeracy skills are
                                    building blocks for future academic success.
                                </p>
                            </li>
                            <li>
                                <h4>Cultivate a Growth Mindset</h4>
                                <p>
                                    A growth mindset helps children believe in
                                    their ability to learn and improve.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.about_right}>
                    <Image
                        src='/pic-4.jpg'
                        alt='about display image'
                        width={500}
                        height={500}
                        style={{ width: 'auto', height: 'auto' }}
                        sizes='(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1200px) 500px'
                        className={styles.about_right_img}
                    />
                </div>
            </div>
            <div className={styles.container}>
                <h2>Hauna Syllabus</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th
                                className={`${styles.header} ${styles.headerLeft}`}
                            >
                                H1 (Nursery)
                            </th>
                            <th className={styles.header}>H2 (LKG)</th>
                            <th
                                className={`${styles.header} ${styles.headerRight}`}
                            >
                                H3 (UKG)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className={styles.star}>★</span>
                                Foundational Skills: Social, Motor, and Sensory
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Early Literacy & Numeracy: Basic Reading & Math
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Advanced Readiness: Preparing for Primary School
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className={styles.star}>★</span>
                                Colors, Shapes, Sounds, Basic Patterns
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Letters, Numbers, Storytelling, Teamwork
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Sentence Formation, Simple Math, General
                                Knowledge
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className={styles.star}>★</span>
                                Play-Based: Blocks, Beads, Ring Stackers
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Phonics, Activity Sheets, Art & Craft Kits
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Progress Cards, Flash Cards, Problem-Solving
                                Games
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className={styles.star}>★</span>
                                Social Interaction, Curiosity, and Observation
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Teamwork, Creativity, and Critical Thinking
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Independence, Advanced Literacy, and Numeracy
                            </td>
                        </tr>
                        <tr className={styles.lastRow}>
                            <td>
                                <span className={styles.star}>★</span>
                                Confidence in Basic Skills
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Strong Foundation for Learning
                            </td>
                            <td>
                                <span className={styles.star}>★</span>
                                Ready for Primary School Transition
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.features}>
                <div className={styles.features_left}>
                    <Image
                        src='/pic-5.jpg'
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
                        <p>Holistic Development</p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img2}
                            width={30}
                            height={30}
                            alt='feature 2 icon'
                            className={styles.features_right_icon}
                        />
                        <p>Comprehensive Curriculum</p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img3}
                            width={30}
                            height={30}
                            alt='feature 3 icon'
                            className={styles.features_right_icon}
                        />
                        <p>Thematic approach Learning</p>
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
                        <p>Teacher Learning</p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img5}
                            width={30}
                            height={30}
                            alt='feature 5 icon'
                            className={styles.features_right_icon}
                            sizes='(max-width: 768px) 1rem'
                        />
                        <p>Easy Integration for Schools</p>
                    </div>
                    <div className={styles.features_right_content}>
                        <Image
                            src={img6}
                            width={30}
                            height={30}
                            alt='feature 6 icon'
                            className={styles.features_right_icon}
                            sizes='(max-width: 768px) 1rem'
                        />
                        <p>Grow-on App Feature</p>
                    </div>
                </div>
            </div>
        </>
    );
}
