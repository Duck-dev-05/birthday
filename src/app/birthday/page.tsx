'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './birthday.module.css';

export default function BirthdayPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Actual photos from the birthday-photos directory
  const photos = [
    '/birthday-photos/IMG_1691689837095_1691689847156.jpg',
    '/birthday-photos/20230701_161520.jpg',
    '/birthday-photos/DSC_1085.JPG',
  ];

  useEffect(() => {
    // Show message after a short delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Auto-advance photos every 5 seconds
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      clearTimeout(messageTimer);
      clearInterval(interval);
    };
  }, [photos.length]);

  const handlePhotoClick = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>Happy</span>
          <br />
          <span>Birthday!</span>
        </h1>
        
        <div className={styles.photoGallery}>
          <div 
            className={styles.photoContainer}
            onClick={() => handlePhotoClick((currentPhotoIndex + 1) % photos.length)}
          >
            <Image
              src={photos[currentPhotoIndex]}
              alt="Birthday memories"
              width={800}
              height={600}
              className={styles.photo}
              priority
              quality={95}
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          <div className={styles.photoControls}>
            {photos.map((_, index) => (
              <button
                key={index}
                className={`${styles.photoDot} ${
                  index === currentPhotoIndex ? styles.active : ''
                }`}
                onClick={() => handlePhotoClick(index)}
                aria-label={`View photo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {showMessage && (
          <div className={styles.message}>
            <p>On this special day,</p>
            <p>May your heart be light,</p>
            <p>Your smile be bright,</p>
            <p>And your joy take flight!</p>
            <p>Wishing you a birthday filled with love and delight! ✨</p>
          </div>
        )}
      </div>

      <div className={styles.confetti}></div>
    </div>
  );
} 