"use client";
import styles from '../app/productPage/[id]/productPage.module.css';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';

export function renderCarousel(product) {
  let heroImagesContainer = document.querySelector(".mainProductImage");
  let carouselContainer = document.querySelector(".imageCarousel");
  heroImagesContainer.querySelectorAll(".heroImages").forEach(el => el.remove());
  carouselContainer.querySelectorAll(".productImages").forEach(el => el.remove());

  let existingModel = carouselContainer.querySelector(".modelProductImages");
  if(!existingModel)
{  
    let modelViewer = document.createElement('div');
    modelViewer.className=`modelProductImages ${styles.modelProductImages}`;
    carouselContainer.insertBefore(modelViewer,carouselContainer.firstChild);
    modelViewer.addEventListener("click",() => {
      let heroImages = document.querySelectorAll(".heroImages");
      heroImages.forEach(hero => hero.classList.remove(styles.activeHero));
      let threeDViewer = document.getElementById("threeDViewContainer");
      threeDViewer.style.display = "block";
      threeDViewer.scrollIntoView({behavior:"smooth",block:"center"});
    });
  }
  if (product) {
    product.forEach((thumb, index) => {
      const isFullUrl = thumb.startsWith('http://') || thumb.startsWith('https://');
      const imageSrc = isFullUrl ? thumb : `/images/${thumb}`;
      let preview = document.createElement('div');
      let heroImage = document.createElement('div');
      preview.className = `productImages ${styles.productImages}`;
      heroImage.className = `heroImages ${styles.heroImages}`;
      preview.style.backgroundImage = `url('${imageSrc}')`;
      heroImage.style.backgroundImage = `url('${imageSrc}')`;
      carouselContainer.appendChild(preview);
      heroImagesContainer.appendChild(heroImage);   
      preview.addEventListener("click", () => {
      let heroImages = document.querySelectorAll(".heroImages");
        heroImages.forEach(hero => hero.classList.remove("activeHero"));
        document.getElementById("threeDViewContainer").style.display = "none";
        if (heroImages[index]) {
          heroImages[index].classList.add("activeHero");
          heroImages[index].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }
}