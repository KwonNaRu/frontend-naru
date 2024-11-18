import React, { useRef } from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
    slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const itemsPerPage = 4;
    const trackRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
        scrollLeft.current = trackRef.current?.scrollLeft || 0;
        if (trackRef.current) {
            trackRef.current.style.cursor = "grabbing";
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        if (trackRef.current) {
            trackRef.current.style.cursor = "grab";
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        isDragging.current = false;
        if (trackRef.current) {
            trackRef.current.style.cursor = "grab";
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - (trackRef.current?.offsetLeft || 0);
        const walk = (x - startX.current) * 1.5; // Adjust scrolling sensitivity
        if (trackRef.current) {
            trackRef.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    return (
        <li className={styles.carousel}>
            <div ref={trackRef} className={styles.carouselTrack} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                {slides.map((slide, index) => (
                    <div className={styles.carouselSlide} key={index} style={{ width: `${100 / itemsPerPage}%` }}>
                        {slide}
                    </div>
                ))}
            </div>
        </li>
    );
};

export default Carousel;
