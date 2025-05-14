'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './birthday/birthday.module.css';
import { FaEnvelope, FaHeart } from 'react-icons/fa';

export default function BirthdayPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);

  // Actual photos from the birthday-photos directory
  const photos = [
    '/birthday-photos/20230701_161520.jpg',
    '/birthday-photos/IMG_1691689837095_1691689847156.jpg',
    '/birthday-photos/DSC_1085.JPG',
  ];

  useEffect(() => {
    // Auto-advance photos every 5 seconds
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [photos.length]);

  const handlePhotoClick = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpening(true);
    setTimeout(() => setIsLetterOpen(true), 600); // match the CSS transition
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>Happy Birthday</span>
          <br />
          <span>My Sister!</span>
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

        {/* Letter envelope and wishes */}
        <div className={styles.letterWrapper}>
          {!isLetterOpen ? (
            <button
              className={`${styles.envelopeButton} ${isEnvelopeOpening ? styles.opening : ''}`}
              onClick={handleOpenEnvelope}
              aria-label="Open birthday letter"
            >
              <div className={styles.envelopeArt}>
                <div className={styles.envelopeFlap} />
                <div className={styles.envelopeBody} />
                <FaEnvelope className={styles.envelopeIcon} />
              </div>
              <span>Mở thư chúc mừng sinh nhật</span>
            </button>
          ) : null}
        </div>

        {isLetterOpen && (
          <div
            className={styles.letterModalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLetterOpen(false);
                setIsEnvelopeOpening(false);
              }
            }}
          >
            <div className={styles.letterModalContent}>
              <button
                className={styles.letterModalClose}
                onClick={() => {
                  setIsLetterOpen(false);
                  setIsEnvelopeOpening(false);
                }}
                aria-label="Đóng thư"
              >
                &times;
              </button>
              <div className={styles.letter}>
                <div className={styles.letterContent}>
                  <p>
                    <FaHeart style={{ color: '#ff6b6b', marginRight: '0.5rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1.4rem', color: '#ff6b6b' }}>
                      Chúc mừng sinh nhật tuổi 26 của chị tui!
                    </span>
                    <span style={{ marginLeft: '0.5rem' }}>🎉</span>
                  </p>
                  <p>
                    Chúc chị luôn vui vẻ, hạnh phúc và thành công trong cuộc sống và tìm được người yêu để cùng nhau sống hạnh phúc nhé chị!
                  </p>
                  <p>
                    Mong mọi điều tốt đẹp nhất sẽ đến với chị trong tuổi mới! <span>✨</span>
                  </p>
                  <p style={{ textAlign: 'right', marginTop: '2rem', fontStyle: 'italic' }}>
                    With love,<br />
                    Em của chị <span style={{ color: '#ff6b6b' }}>❤️</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.confetti}></div>
    </div>
  );
} 