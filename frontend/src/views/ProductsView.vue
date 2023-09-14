<template>
    <div>
        <div class="upper-bg">
            <h1>Apparel</h1>
            <h5>
                Get your favourite wrestlers apparel ranging from t-shirts, to hoodies. You can get up to 35% off!
            </h5>
        </div>

        <!-- <div class="category-filter">
          <label for="category">Category:</label>
          <select v-model="selectedCategory" id="Category">
            <option value="">All</option>
            <option value="apparel">Apparel</option>
            <option value="accessories">Accessories</option>
            <option value="collectibles">Collectibles</option>
          </select>
        </div> -->

        <div class="filter">
          <h3>Filter</h3>

          <select v-model="selectedCategory" id="Category">
            <option value="">All</option>
            <option value="apparel">Apparel</option>
            <option value="accessories">Accessories</option>
            <option value="collectibles">Collectibles</option>
          </select>

          
        </div>

        <div class="card-container" v-if="filteredProducts">
            <ProductCard :products="filteredProducts" />
        </div>

        <div v-else>
            Processing....
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    components: { ProductCard },

    data() {
      return {
        selectedCategory: null,
      };
    },

    computed: {
        products() {
            return this.$store.state.products;
        },

        filteredProducts() {
          const selectedCategory = this.selectedCategory; // <-- Changed this line

          if (selectedCategory) {
            return this.products.filter((product) => {
              return product.category && product.category.includes(selectedCategory);
            });
          } else {
            return this.products;
          }
        },
    },

    mounted() {
        this.$store.dispatch("getProducts");
    },
}
</script>

<style scoped>
.card-container {
    display: flex;

}

.upper-bg{
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://i.postimg.cc/BZgH5xqB/Punk.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    /* min-height: 60vh; */
    height: 600px;
}

.upper-bg h1 h5{
    text-align: center;
    color: pink;
}
</style>