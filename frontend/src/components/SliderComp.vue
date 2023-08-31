<template>
  <div class="wrapper">
    <!-- <i id="left" class="fa-solid fa-angle-left" @click="scrollCarousel(-1)">  </i> -->
    <div class="carousel" ref="carousel" @mousedown="dragStart" @touchstart="dragStart">
      <img
        v-for="(image, index) in images"
        :src="image.src"
        :alt="'img' + index"
        draggable="false"
        :key="index"
        @click="clickImage(index)"
      />
    </div>
    <!-- <i id="right" class="fa-solid fa-angle-right" @click="scrollCarousel(1)">  </i> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: 'https://i.postimg.cc/3wGgwZvB/Bret_Hart_Logo-removebg-preview.png' },
        { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        { src: 'https://i.postimg.cc/fRpcZPJy/f89d8369-b0cf-40cf-b43d-db3d250b91cf-removebg-preview.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' },
        // { src: 'https://i.postimg.cc/mk9YPNJR/cm-punk-lightning-bolt-fist-red-logo-by-darkvoidpictures-dcx9i6l.png' }
      ],
      isDragStart: false,
      isDragging: false,
      prevPageX: 0,
      prevScrollLeft: 0,
      positionDiff: 0,
      autoSlideInterval: null,
      autoSlideDelay: 5000,
    };
  },
  methods: {
    scrollCarousel(direction) {
      const firstImgWidth = this.$refs.carousel.querySelectorAll("img")[0].clientWidth + 14;
        if (direction === 1) {
          // Scroll to the right
          this.$refs.carousel.scrollLeft += firstImgWidth;
        } else {
          // Scroll to the left
          const scrollWidth = this.$refs.carousel.scrollWidth - this.$refs.carousel.clientWidth;
          if (this.$refs.carousel.scrollLeft <= firstImgWidth) {
            this.$refs.carousel.scrollLeft = scrollWidth;
          } else {
            this.$refs.carousel.scrollLeft -= firstImgWidth;
          }
        }
    
    setTimeout(this.showHideIcons, 60);
    },
    showHideIcons() {
      const carousel = this.$refs.carousel;
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    },
    autoSlide() {
        this.scrollCarousel(1);
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
    },

    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.scrollCarousel(1); // Slide to the right (next image)
      }, this.autoSlideDelay);
    },

    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.dragging);
    this.$refs.carousel.addEventListener("touchmove", this.dragging);
    window.addEventListener("mouseup", this.dragStop);
    this.$refs.carousel.addEventListener("touchend", this.dragStop);
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide(); // Stop automatic sliding before component is destroyed
  },
};
</script>

<style scoped>
/* Your CSS styles here */
.wrapper {
  display: flex;
  max-width: 1200px;
  position: relative;
}

.wrapper i {
  top: 50%;
  height: 44px;
  width: 44px;
  color: #343F4F;
  cursor: pointer;
  font-size: 1.15rem;
  position: absolute;
  text-align: center;
  line-height: 44px;
  background: #fff;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: transform 0.1s linear;
}

.wrapper i:active {
  transform: translateY(-50%) scale(0.9);
}

.wrapper i:hover {
  background: #f2f2f2;
}

.wrapper i:first-child {
  left: -22px;
  display: none;
}

.wrapper i:last-child {
  right: -22px;
}

.wrapper .carousel {
  font-size: 0px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.carousel.dragging {
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
