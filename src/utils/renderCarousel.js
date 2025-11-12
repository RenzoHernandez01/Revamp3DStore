"use client";

import styles from '../app/productPage/productPage.module.css';

export function renderCarousel(product) {
  console.log(product.images);
  let heroImagesContainer = document.querySelector(".mainProductImage");
  let carouselContainer = document.querySelector(".imageCarousel");
 console.log(product?.images?.length);
  if (product) {
    product.images.forEach((thumb, index) => {
      const isFullUrl = thumb.startsWith('http://') || thumb.startsWith('https://');
      const imageSrc = isFullUrl ? thumb : `/images/${thumb}`;
      let preview = document.createElement('div');
      let heroImage = document.createElement('div');
      preview.className = `productImages", ${styles.productImages}`;
      heroImage.className = `heroImages ${styles.heroImages}`;
      preview.style.backgroundImage = `url('${imageSrc}')`;
      heroImage.style.backgroundImage = `url('${imageSrc}')`;
      carouselContainer.appendChild(preview);
      heroImagesContainer.appendChild(heroImage);   
        preview.addEventListener("click", () => {
        let heroImages = document.querySelectorAll(".heroImages");
        heroImages.forEach(hero => hero.classList.remove("activeHero"));
        if (heroImages[index + 1]) {
          heroImages[index + 1].classList.add("activeHero");
          heroImages[index + 1].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    
    });
  }
}