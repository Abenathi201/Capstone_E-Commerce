<template>
    <div class="container">
        <div class="hero">
        </div>

        <div class="logos">
            <SliderComp/>
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
                        <img src="https://i.postimg.cc/7hD5Yk6y/aew1947-1-punk.png" alt="Punk">
                    </div>
                    <div class="desc">
                        <h3> CM Punk Best In The World </h3>
                        <h4> $ 89 </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HomeCard from './HomeCard.vue';
import SliderComp from './SliderComp.vue';
export default {
    components: { SliderComp, HomeCard }
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

.hero{
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/T3JXrjGd/scsa-by-xxjer3mxx-d3aaiw9.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

.logos{
    display: flex;
    justify-content: space-around;
    margin-block: 15px;
}

.logos img{
    width: 400px;
    height: 400px;
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

.card-container .card{
    width: 270px;
    height: 372px;
}

.card-img img{
    width: 100%;
    height: 100%;
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
</style>