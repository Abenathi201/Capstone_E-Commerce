<template>
    <div class="container">
        <div class="hero">
            <iframe
          class="video-bg"
          src="https://www.youtube.com/embed/bBBpoU0IO5w?autoplay=1&mute=1&loop=1&playlist=bBBpoU0IO5w&controls=0&showinfo=0&rel=0"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <iframe
          class="video-bg"
          src="https://www.youtube.com/embed/7pgR2roZMb8?autoplay=1&mute=1&loop=1&playlist=7pgR2roZMb8&controls=0&showinfo=0&rel=0"
          frameborder="0"
          allowfullscreen
        ></iframe>
        </div>
        
        <div class="arrivals">
            <HomeCard/>
        </div>

        <div class="departments">
            <div class="apparel">
                <h1 class="department-img">Apparel</h1>
            </div>

            <div class="accessories">
                <h1 class="department-img">Accessories</h1>
            </div>

            <div class="collectibles">
                <h1 class="department-img">Collectibles</h1>
            </div>
        </div>

        <div class="best-sellers">
            <h6>TOP SELLING</h6>
            <h1>Best Sellers</h1>

            <div class="card-container">

                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/nLLs6cDS/mens-white-the-bloodline-we-the-ones-t-shirt-ss5-p-200065539-pv-1-u-oipmugyvmbhv4dhr49gv-v-jhvzuyypb.jpg" alt="">
                    </div>
                    <div class="desc">
                        <h3> BloodLine We the Ones </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/7hD5Yk6y/aew1947-1-punk.png" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3> CM Punk Best In The World </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/Bn4PBCQ0/mens-ripple-junction-heather-red-bret-hart-hitman-t-shirt-ss5-p-200071754-pv-2-u-qr0qffk56nvzgu2iiky.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3> Bret "The Hitman" Hart </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/ydkZSY63/mens-fanatics-branded-black-stone-cold-steve-austin-vs-bret-hit-man-hart-wwe-rivals-t-shirt-ss5-p-53.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3>Austin and Hart</h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/W49Z3JVP/mens-chalk-line-black-bret-hart-snapback-hat-ss5-p-200029723-pv-2-u-rchmbrdkmh8quspxm4k2-v-yfsxyrm6t.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3> Bret Hart Cap </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/Y99SyXT5/mens-black-stone-cold-steve-austin-vintage-punk-t-shirt-ss5-p-200043380-pv-1-u-tmiuxyoeqczx86glkaug.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3>Austin Vintage</h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/TYWK64hG/mens-black-stone-cold-steve-austin-kotr-1996-interview-t-shirt-pi4906000-ff-4906624-e67dfb71d098e98d.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3>Austin King Of The Ring </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src="https://i.postimg.cc/59Kz1z35/mens-black-judgment-day-all-rise-moon-pullover-hoodie-ss5-p-5342955-pv-2-u-ucpeimnd4guifkmjme8m-v-ac.jpg" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3>The Judgement Day</h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HomeCard from './HomeCard.vue';
export default {
    components: {  HomeCard }
}
</script>

<style scoped>
/* .hero{
    background-image: url("https://i.postimg.cc/T3JXrjGd/scsa-by-xxjer3mxx-d3aaiw9.png");
    background-position:initial;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
} */

/* .hero{
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/T3JXrjGd/scsa-by-xxjer3mxx-d3aaiw9.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
} */
.container{
    margin-top: 40px;
}

.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.departments{
    display: flex;
    justify-content: space-around;
    margin-block: 100px;
}

.arrivals{
    margin-block: 15px;
    display: flex;
    justify-content: center;
}

.apparel{
    background-image: url(https://i.postimg.cc/wjfn3BzF/The-Hotrod-removebg-preview.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 360px;
    height: 495px;
    cursor: pointer;
    transition: 0.3s ease;
}

.apparel:hover{
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/wjfn3BzF/The-Hotrod-removebg-preview.png);
    /* transition: 0.3s all; */
}
.accessories{
    background-image: url(https://i.postimg.cc/MKYC2DrC/WWE-Winged-Eagle-Dual-Plated-Championship-Replica-Title-Belt.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 360px;
    height: 495px;
    cursor: pointer;
    transition: 0.3s ease;
}

.accessories:hover{
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/MKYC2DrC/WWE-Winged-Eagle-Dual-Plated-Championship-Replica-Title-Belt.jpg);
    /* transition: 0.3s all; */
}
.collectibles{
    background-image: url(https://i.postimg.cc/nhc6HDyC/Dusty-Rhodes-WWE-Elite-63.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 360px;
    height: 495px;
    cursor: pointer;
    transition: 0.3s ease;
}

.collectibles:hover{
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/nhc6HDyC/Dusty-Rhodes-WWE-Elite-63.jpg);
    /* transition: 0.3s all; */
}

.department-img{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    color: #fff;
}

.best-sellers {
    margin-block: 30px;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    padding: 30px;
}
.best-sellers h1, h6 {
    text-align: center;
}

.best-sellers h1 {
    margin-top: 40px;
}

.card-container{
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: space-around;
    margin-bottom: 50px;
}

.card-container .card{
    width: 290px;
    height: 302px;
}

.card-img img{
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.card .desc {
    text-align: center;
}
.card .desc h3 {
    text-align: center;
    font-size: 16px;
}
.card .desc h4 {
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

@media only screen and (max-width: 767px) {
  .arrivals {
    margin-block: 30px;
  }

  .departments {
    flex-direction: column;
    align-items: center;
    margin-block: 30px;
  }

  .departments div {
    margin-bottom: 20px;
  }
  .apparel, .accessories, .collectibles {
    width: 100%;
    max-width: 360px;
  }
  .department-img {
    height: auto;
    width: 100%;
  }
  .best-sellers h1 {
    font-size: 24px;
    margin-top: 20px;
  }
  .card-container {
    justify-content: center;
  }
  .card-container .card {
    margin-bottom: 20px; /* Add some space between cards */
  }
}
</style>