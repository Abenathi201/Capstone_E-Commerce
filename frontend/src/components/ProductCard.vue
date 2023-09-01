<template>
    <div>
        <div class="card" v-for="product in products" :key="product.productID">
            <router-link :to="{ name: 'product', params: { productID: product.productID } }">
                <div class="card-img">
                    <img :src="product.imageURL" :alt="product.productName">
                </div>
            </router-link>

            <div class="desc">
                <h3> {{ product.productName }} </h3>
                <h4> $ {{ product.productPrice }} </h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["products"]
}
</script>

<style scoped>
.card{
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