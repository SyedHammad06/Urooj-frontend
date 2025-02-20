'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './carousel.module.css';

const images = ['/img-1.jpg', '/img-2.jpg', '/img-3.jpg', '/img-4.jpg'];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carouselOutside}>
            <h2 className={styles.carouselHeading}>Slideshow</h2>
            <div className={styles.carouselContainer}>
                <div
                    className={styles.carouselTrack}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className={styles.carouselSlide}>
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`}
                                fill
                                priority={index === 0}
                                className={styles.carouselImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
