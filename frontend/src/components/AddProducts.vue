<template>
    <div class="modal">
            <div class="login-box">
                <form @submit.prevent="addProduct">
                    <div class="user-box">
                      <input type="text" id="productName" required v-model="newProduct.productName">
                      <label>Product Name</label>
                    </div>

                    <div class="user-box">
                      <input type="number" id="productPrice" required v-model="newProduct.productPrice">
                      <label>Product Price</label>
                    </div>

                    <div class="user-box">
                      <input type="text" id="imageURL" required v-model="newProduct.imageURL">
                      <label>Product Image URL</label>
                    </div>

                    <div class="user-box">
                      <input type="text" id="description" required v-model="newProduct.description">
                      <label>Description</label>
                    </div>

                    <div class="user-box">
                      <input type="number" id="quantity" required v-model="newProduct.quantity">
                      <label>Quantity</label>
                    </div>

                    <div class="user-box">
                      <input type="text" id="quantity" required v-model="newProduct.Categories">
                      <label>Category</label>
                    </div>

                    <center>
                        <button type="submit">SEND</button>
                    </center>
                </form>
            </div>
    </div>
  </template>

<script>
export default {  
    data() {
        return {
            newProduct: {
                productName: "",
                productPrice: "",
                imageURL: "",
                description: "",
                quantity: "",
                Categories: "",
            }
        };
    },

    methods: {
        close() {
          this.$emit("close");
        },

        async addProduct() {
            try {
                await this.$store.dispatch("addProduct", this.newProduct);
                this.$router.push("/admin");
                this.newProduct = {
                    productName: "",
                    productPrice: "",
                    imageURL: "",
                    description: "",
                    quantity: "",
                    Categories: "",
                };
                console.log("Product added successfully!")
            } catch (error) {
                console.error("Error adding product:", error);
            }
        }
    },
};
</script>

<style scoped>
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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