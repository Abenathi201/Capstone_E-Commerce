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

                <div class="colours">
                </div>

                <div class="button">
                    <button @click="addItem(product.productID)" class="btn">Add To Cart</button>
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
            // console.log("Adding item to cart:", productID);
            // console.log("Product data:", this.product);
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
}
.container1{
    width: 635px;
    height: 899.5px;
    display: flex;
    flex-direction: column;
}
.btn{
    margin-block: 100px;
}
</style>