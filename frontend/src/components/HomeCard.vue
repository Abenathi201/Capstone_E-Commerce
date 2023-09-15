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
          { src: 'https://i.postimg.cc/TYWK64hG/mens-black-stone-cold-steve-austin-kotr-1996-interview-t-shirt-pi4906000-ff-4906624-e67dfb71d098e98d.jpg' },
          { src: 'https://i.postimg.cc/Bn4PBCQ0/mens-ripple-junction-heather-red-bret-hart-hitman-t-shirt-ss5-p-200071754-pv-2-u-qr0qffk56nvzgu2iiky.jpg' },
          { src: 'https://i.postimg.cc/15LNVZbf/mens-black-bret-hart-hitman-fleece-pullover-hoodie-ss5-p-200119505-pv-2-u-xf2kfwtzp9tp12qtxvn9-v-rfc.jpg' },
          { src: 'https://i.postimg.cc/TPxLQJdx/mens-black-stone-cold-steve-austin-adjustable-hat-ss5-p-5291626-pv-1-u-e34amwfmxofglp59lp2b-v-ildb9a.jpg' },
          { src: 'https://i.postimg.cc/7P535Xbt/mens-black-the-usos-penitentiary-snapback-hat-ss5-p-200395990-pv-2-u-ayrchzziooixpiaivxeb-v-jle2xatl.jpg' },
          { src: 'https://i.postimg.cc/8CJJZ43x/mens-black-stone-cold-steve-austin-half-skull-t-shirt_pi4900000_ff_4900893-bc2dc40ae516f9ae61b1_full.webp' },
          { src: 'https://i.postimg.cc/7hD5Yk6y/aew1947-1-punk.png' },
          { src: 'https://i.postimg.cc/W4BDCrcz/aew2174-1-cmpunk-sting-sting.png' },
          { src: 'https://i.postimg.cc/MKYC2DrC/WWE_Winged_Eagle_Dual_Plated_Championship_Replica_Title_Belt.jpg' }
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
  },

  beforeDestroy() {
    window.removeEventListener("mousemove", this.dragging);
    this.$refs.carousel.removeEventListener("touchmove", this.dragging);
    window.removeEventListener("mouseup", this.dragStop);
    this.$refs.carousel.removeEventListener("touchend", this.dragStop);
  }
  };
  </script>
  
<style scoped>
.card {
  display: flex;
  max-width: 1100px;
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
  /* font-size: 15px; */
  font-weight: 700;
  /* filter: drop-shadow(-5px 30px 28px #000); */
  box-shadow: 0 18px 40px rgba(180, 177, 177, 0.70);
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