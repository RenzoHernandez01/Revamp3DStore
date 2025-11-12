import styles from "../app/productPage/productPage.module.css";
import React, { useEffect, useRef } from 'react';
import ProductCards from '../app/components/productCards.js';

export function setupCarousel(wrapper, container) {
  let leftBtn = wrapper.querySelector('.scrollLeft');
  let rightBtn = wrapper.querySelector('.scrollRight');

  if (leftBtn && container) {
    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      console.log("hellosdsds");
    });
  }
  if (rightBtn && container) {
    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      console.log("hellosdsds");
    });
  }
}

export default function RenderMoreCarousel({ children }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      setupCarousel(wrapperRef.current, containerRef.current);
    }
  }, []);

  return (
  <div ref={wrapperRef} className={`${styles.carouselWrapper}`}>
    <button className={`scrollLeft ${styles.scrollLeft}`}>&lt;</button>
    <button className={`scrollRight ${styles.scrollRight}`}>&gt;</button>
  <div ref={containerRef} className={` ${styles.carouselTrack }`}>
    <div  className={`${styles.carouselContent}`}>
      {children || <ProductCards />}
    </div>
  </div>
</div>

  );
}
