<template>
    <div>
        <div class="upper-bg">
            <h1>Apparel</h1>
            <h5>
                Get your favourite wrestlers apparel ranging from t-shirts, to hoodies. You can get up to 35% off!
            </h5>
        </div>
        <div class="container">

          <div class="filter">
            <h3>Filter</h3>

            <hr>
            <div class="category">
              <label for="touch"><span>Category</span></label>      
              <input type="checkbox" id="touch"> 
  
              <ul class="slide">
                <button @click="filterCategory('all')">All</button> 
                <button @click="filterCategory('apparel')">Apparel</button>
                <button @click="filterCategory('accessories')">Accessories</button>
                <button @click="filterCategory('collectibles')">Collectibles</button>
              </ul>
            </div>
            <hr>

            <div class="price-filter">
              <div class="inputs">
                <input type="number" v-model="minPrice" id="minPrice" class="minPrice" placeholder="0.00">
                <p><i class="uil uil-minus"></i></p>
                <input type="number" v-model="maxPrice" id="maxPrice" class="maxPrice" placeholder="600.00">
              </div>
              <button @click="applyPriceFilter">Save</button>
            </div>
            <hr>

          </div>
  
          <div class="card-container" v-if="products">
            <div class="upper">
              <!-- <div class="searchBox">
                <input class="searchInput" v-model="searchQuery" type="text" name="" placeholder="Search">
                <button class="searchButton" @click="searchProducts">
                  <i class="uil uil-search" ></i>
                </button>
              </div> -->
              <div class="search-box">
                <!-- <button class="btn-search"><i class="fas fa-search"></i></button> -->
                <input type="text" v-model="searchQuery" class="input-search" placeholder="Type to Search...">
              </div>


              <div class="sort-dropdown">
                <label for="sortOrder">Sort By:</label>
                <select v-model="selectedSortOrder" id="sortOrder">
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
            
            <ProductCard :products="filteredProducts" class="products" />
          </div>
  
          <div v-else>
              Processing....
          </div>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    components: { ProductCard },

    data() {
      return {
        selectedCategory: 'all',
        minPrice: null,
        maxPrice: null,
        shouldApplyPriceFilter: false,
        selectedSortOrder: 'ascending',
        searchQuery: '',
      };
    },

    computed: {
        products() {
            return this.$store.state.products;
        },

        filteredProducts() {
          // console.log(this.selectedCategory);
          let productToView = this.products;
                
          if(this.selectedCategory !== 'all') {
            productToView = productToView.filter(product => product.Categories === this.selectedCategory)
          };

          if (this.shouldApplyPriceFilter && this.minPrice !== null && this.maxPrice !== null) {
            productToView = productToView.filter(product => 
              product.productPrice >= this.minPrice && product.productPrice <= this.maxPrice
            );
          };

          if (this.selectedSortOrder === 'ascending') {
            productToView.sort((a, b) => a.productPrice - b.productPrice);
          } else if (this.selectedSortOrder === 'descending') {
            productToView.sort((a, b) => b.productPrice - a.productPrice);
          };

          if (this.searchQuery) {
            productToView = productToView.filter(product => 
              product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
          };
        
          return productToView;
        },
    },

    mounted() {
        this.$store.dispatch("getProducts");
    },

    methods: {
      filterCategory(categories) {
        this.selectedCategory = categories;
      },

      applyPriceFilter() {
        this.shouldApplyPriceFilter = true;
        // this.shouldApplyPriceFilter = false;
      },
    },
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.filter{
  width: 273px;
  margin-left: 50px;
}

.filter h3{
  text-align: center;
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 600;
}

span {
  padding : 30px;
  background : #FFFFFF;
  width: 271px; 
  /* color : white; */
  font-size : 16px;
  font-weight: 600;
  cursor : pointer;
  display: block;
}

span::after {
  float: right;
  right: 10%;
  content: "V";
}

.slide {
  clear:both;
  width:100%;
  height:0px;
  overflow: hidden;
  text-align: center;
  transition: height .4s ease;
}

/* .slide button */

.slide button {
  padding : 30px;
  width: 271px;
  height: 21px;
  text-align: start;
  background: #FFFFFF;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

#touch {
  position: absolute; 
  opacity: 0; 
  height: 0px;
}    

#touch:checked + .slide {
  height: 300px;
} 

.price-filter{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-block: 30px;
}

.price-filter .inputs{
  display: flex;
  justify-content: center;
  gap: 13px;
}

.price-filter p {
  /* vertical-align: middle; */
  margin-top: 15px;
}

.inputs .minPrice, .inputs .maxPrice{
  width: 115px;
  height: 45px;
  border: 1px solid #E4E4E4;
  padding-left: 5px;
}

.price-filter button{
  width: 271px;
  height: 40px;
  font-size: 14px;
  font-weight: normal;
  background: #FFFFFF;
  cursor: pointer;
}
.upper {
  display: flex;
  justify-content: space-between;
}

.card-container{
  display: flex;
  flex-direction: column;
  margin-left: 120px;
}

.input-search{
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  background-color: #000000;
  padding-right: 40px;
  color:#FFFFFF;
  cursor: pointer;
}
.input-search::placeholder{
  color: #FFFFFF;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
.input-search:focus{
  width: 300px;
  border-radius: 0px;
  background-color: #000000;
  transition: all 500ms cubic-bezier(0, 0.110, 0.35);
  cursor: auto;
}

.products{
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
  /* margin-block: ; */
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

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .filter {
    width: 100%;
    margin: 0;
  }

  .card-container {
    margin-left: 0;
  }

  .upper-bg {
    height: 300px;
  }
  
  .products {
    gap: 80px;
  }
}
</style>