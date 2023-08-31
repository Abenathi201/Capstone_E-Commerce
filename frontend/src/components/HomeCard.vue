<template>
  <div>
    <h1>New Arrivals</h1>

    <div class="card">
      <i id="left" class="fa-solid fa-angle-left" @click="scrollCarousel(-1)">  </i>
      <div class="carousel" ref="carousel" @mousedown="dragStart" @touchstart="dragStart">

        <img
          v-for="(image, index) in images"
          :src="image.src"
          draggable="false"
          :key="index"
          @click="clickImage(index)"
        />
        <h5>Product Name</h5>
        <p>$ 12.00</p>
      </div>
      <i id="right" class="fa-solid fa-angle-right" @click="scrollCarousel(1)">  </i>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
          { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' }
        ],
        isDragStart: false,
        isDragging: false,
        prevPageX: 0,
        prevScrollLeft: 0,
        positionDiff: 0
      };
    },
    methods: {
      scrollCarousel(direction) {
        const firstImgWidth = this.$refs.carousel.querySelectorAll("img")[0].clientWidth + 14;
        this.$refs.carousel.scrollLeft += direction * firstImgWidth;
        setTimeout(this.showHideIcons, 60);
      },
      showHideIcons() {
        const carousel = this.$refs.carousel;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        this.$el.querySelector("#left").style.display = carousel.scrollLeft === 0 ? "none" : "block";
        this.$el.querySelector("#right").style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
      },
      autoSlide() {
        if (this.$refs.carousel.scrollLeft - (this.$refs.carousel.scrollWidth - this.$refs.carousel.clientWidth) > -1 || this.$refs.carousel.scrollLeft <= 0) {
          return;
        }
  
        this.positionDiff = Math.abs(this.positionDiff);
        const firstImgWidth = this.$refs.carousel.querySelectorAll("img")[0].clientWidth + 14;
        let valDifference = firstImgWidth - this.positionDiff;
  
        if (this.$refs.carousel.scrollLeft > this.prevScrollLeft) {
          return (this.$refs.carousel.scrollLeft += this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff);
        }
        this.$refs.carousel.scrollLeft -= this.positionDiff > firstImgWidth / 3 ? valDifference : -this.positionDiff;
      },
      dragStart(e) {
        this.isDragStart = true;
        this.prevPageX = e.pageX || e.touches[0].pageX;
        this.prevScrollLeft = this.$refs.carousel.scrollLeft;
      },
      dragging(e) {
        if (!this.isDragStart) return;
        e.preventDefault();
        this.isDragging = true;
        this.$refs.carousel.classList.add("dragging");
        this.positionDiff = (e.pageX || e.touches[0].pageX) - this.prevPageX;
        this.$refs.carousel.scrollLeft = this.prevScrollLeft - this.positionDiff;
        this.showHideIcons();
      },
      dragStop() {
        this.isDragStart = false;
        this.$refs.carousel.classList.remove("dragging");
  
        if (!this.isDragging) return;
        this.isDragging = false;
        this.autoSlide();
      },
      clickImage(index) {
        // Handle click on an image if needed
      }
    },
    mounted() {
      window.addEventListener("mousemove", this.dragging);
      this.$refs.carousel.addEventListener("touchmove", this.dragging);
      window.addEventListener("mouseup", this.dragStop);
      this.$refs.carousel.addEventListener("touchend", this.dragStop);
    }
  };
  </script>
  
<style scoped>
.card {
  display: flex;
  max-width: 1200px;
  position: relative;
}

h1{
  text-align: center;
}
.card i {
  top: 50%;
  height: 44px;
  width: 44px;
  color: #000;
  cursor: pointer;
  font-size: 1.15rem;
  position: absolute;
  text-align: center;
  line-height: 44px;
  background: #fff;
  filter: drop-shadow(-5px 30px 28px #000);
  border-radius: 50%;
  transform: translateY(-50%);
  transition: transform 0.1s linear;
}

.card i:active {
  transform: translateY(-50%) scale(0.9);
}

.card i:first-child {
  left: -22px;
  display: none;
}

.card i:last-child {
  right: -22px;
}

.card .carousel {
  font-size: 0px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.carousel .dragging {
  cursor: grab;
  scroll-behavior: auto;
}

.carousel.dragging img {
  pointer-events: none;
}

.carousel img {
  height: 340px;
  object-fit: cover;
  user-select: none;
  margin-left: 14px;
  width: calc(100% / 3);
}

.carousel img:first-child {
  margin-left: 0px;
}

@media screen and (max-width: 900px) {
  .carousel img {
    width: calc(100% / 2);
  }
}

@media screen and (max-width: 550px) {
  .carousel img {
    width: 100%;
  }
}
</style>