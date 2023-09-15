<template>
    <div class="modal-inner">
        <div class="login-box">
            <form>
                <div class="user-box">
                  <input type="text" id="productName" required v-model="updatedProduct.productName" :placeholder="updatedProduct.productName">
                  <label>Product Name</label>
                </div>
                <div class="user-box">
                  <input type="number" id="productPrice" required v-model="updatedProduct.productPrice" :placeholder="updatedProduct.productPrice">
                  <label>Product Price</label>
                </div>
                <div class="user-box">
                  <input type="text" id="imageURL" required v-model="updatedProduct.imageURL" :placeholder="updatedProduct.imageURL">
                  <label>Product Image URL</label>
                </div>
                <div class="user-box">
                  <input type="text" id="description" required v-model="updatedProduct.description" :placeholder="updatedProduct.description">
                  <label>Description</label>
                </div>
                <div class="user-box">
                  <input type="number" id="quantity" required v-model="updatedProduct.quantity" :placeholder="updatedProduct.quantity">
                  <label>Quantity</label>
                </div>
                <div class="user-box">
                  <input type="text" id="quantity" required v-model="updatedProduct.Categories" :placeholder="updatedProduct.Categories">
                  <label>Category</label>
                </div>
                <button @click="updateProd">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {  
    data() {
    return {
        updatedProduct: {
            productID: this.$route.params.id,
            productName: '',
            productPrice: '',
            imageURL: '',
            description: '',
            quantity: '',
            Categories: '',
            }
        };
    },

    methods: {
        updateProd() {
            const componentContext = this;
            this.$store.dispatch("updateProduct", this.updatedProduct)
                .then(() => {
                    this.$router.push('/admin');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },

    props: ["id"],

    computed: {
        product() {
            return this.$store.state.product;
        },
    },

    mounted() {
        const productID = this.$route.params.id
        this.$store.dispatch("getProduct", productID);
    },
};
</script>

<style scoped>
.modal-inner {  
    width: 555px;
    height: 250px;
    display: flex;
    justify-content: space-between;
    /* margin-top: 50px; */
}
.modal-inner{
    width: 222px;
    height: 250px;
    /* margin-top: 50px; */
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #000000;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  margin-top: 50px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form button{
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box button:hover {
  background: #000;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #000,
}

.login-box button span {
  position: absolute;
  display: block;
}
</style>