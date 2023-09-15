<template>
    <div>
        <div class="container" v-if="product">
            <div class="container1">

                <div class="img-div">
                    <img :src="product.imageURL" :alt="product.productName">
                </div>

                <div class="desc-div">
                    <h3>Description</h3>
                    <p>
                        {{ product.description }}
                    </p>
                </div>
            </div>

            <div class="container2">

                <div class="title">
                    <h1> {{ product.productName }} </h1>
                    <h6>$ {{ product.productPrice }}</h6>
                </div>

                <hr>
                <div class="colours">
                    <h1>Color <span>(Black)</span></h1>

                    <div class="circles">
                        <div class="cricle1"></div>
                        <div class="cricle2"></div>
                        <div class="cricle3"></div>
                    </div>
                </div>
                <hr>
                <div class="button">
                    <button @click="addItem(product.productID, 1)" class="btn">Add To Cart</button>
                </div>
                <div class="button">
                    <button  class="btn2"> <i class="uil uil-heart-alt"></i> Favourite</button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
export default {
    computed: {
        product() {
            return this.$store.state.product;
        }
    },

    methods: {
        addItem(productID, quantity) {
            console.log("Adding item to cart:", productID);
            console.log("Product data:", this.product);
            // console.log("Adding item to cart:", productID);
            this.$store.dispatch("addToCart", { productID, quantity });
        },

        // addItem(productID, quantity) {
        //     this.$store.dispatch("addToCart", { productID, quantity });
        // }
    },

    mounted() {
        const productID = this.$route.params.productID;
        this.$store.dispatch("getProduct", productID);
    },
}
</script>

<style scoped>
.container{
    display: flex;
    margin-top: 200px;
    /* margin: auto; */
    width: 280px;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%,-50%);

}
.container1{
    width: 635px;
    height: 899.5px;
    display: flex;
    flex-direction: column;
}

.img-div{
    width: 492px;
    height: 526px;
}

.img-div img{
    height: 100%;
    width: 100%;
}

.desc-div {
    width: 635px;
}

.desc-div h3{
    font-size: 16px;
    font-weight: normal;
}

.container2{
    width: 400px;
    height: 509px;
}

.colours h1{
    font-size: 16px;
    font-weight: 600;
}
.colours h1 span{
    font-size: 14px;
    font-weight: normal;
}

.circles{
    display: flex;
    gap: 15px;
    margin-block: 40px;
}

.circles .cricle1 {
    width: 34px;
    height: 34px;
    background: #000000;
    border-radius: 50%;
}
.circles .cricle2 {
    width: 34px;
    height: 34px;
    background: #FFFFFF;
    border: 2px solid #E4E4E4;
    border-radius: 50%;
}
.circles .cricle3 {
    width: 34px;
    height: 34px;
    background: #D9D9D9;
    border-radius: 50%;
}
.container2 h1{
    font-size: 32px;
    font-weight: bold;
    text-align: start;
    
}

.container2 h6{
    font-size: 16px;
    font-weight: 600;
    text-align: start;
    margin-block: 30px;
}
.btn{
    width: 399px;
    height: 45px;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: normal;
    border: none;
    cursor: pointer;
    margin-bottom: 30px;
    margin-top: 15px;
}

.btn2{
    width: 399px;
    height: 45px;
    background-color: #FFFFFF;
    /* color: #FFFFFF; */
    font-size: 14px;
    font-weight: normal;
    border: 1px solid #E4E4E4;
    cursor: pointer;
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .container1,
  .container2 {
    width: 100%;
    max-width: none;
  }

  .img-div {
    width: 100%;
  }

  .desc-div {
    width: 100%;
  }
}

</style>