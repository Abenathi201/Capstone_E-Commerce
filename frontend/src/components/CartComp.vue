<template>
    <div class="modal">
        <div class="modal-header">
            <h1>Shopping Cart</h1>
            <!-- <h2 @click="close">X</h2> -->
        </div>
        <div v-if="cartItems">
            <div class="modal-inner" v-for="item in cartItems" :key="item.cartID">
    
                <div class="modal-img">
                    <img :src="item.imageURL" :alt="item.productName">
                </div>
    
                <div class="modal-info">
                    <div class="name">
                        <h1>{{ item.productName }}</h1>
                        <h1>$ {{ item.productPrice }}</h1>
                    </div>
    
                    <div class="actions">
                        <div class="input">
                          <button @click="decreaseQuantity(item)">
                              <i class="fas fa-minus"></i>
                              </button>
                              <input v-model="item.quantity" type="number" min="1" readonly>
                              <button @click="increaseQuantity(item)">
                              <i class="fas fa-plus"></i>
                              </button>
                        </div>
    
                        <div class="del-btn">
                            <i class="uil uil-trash-alt" @click="deleteItem(item.cartID)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            Getting cart items
        </div>
    </div>
  </template>

<script>
export default {
    computed: {
          cartItems() {
        return this.$store.state.cartItems;
      }
    },

    methods: {
    async getUserID() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.result && userData.result.userID) {
          const userID = userData.result.userID;
          await this.$store.dispatch("getCartItems", userID);
        } else {
          console.error('User data or userID not found in local storage');
        }
      },

      // async updateQuantity(item) {
      //   await this.$store.dispatch("updateCartItemQuantity", item);
      // },

      async updateQuantity(cartID, newQuantity) {
        await this.$store.dispatch("updateCartQuantity", { cartID, quantity: newQuantity });
      },

      decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item.cartID, item.quantity);
    }
  },
  increaseQuantity(item) {
    item.quantity++;
    this.updateQuantity(item.cartID, item.quantity);
  },

      // async addToCart(productID, quantity) {
      //   await this.$store.dispatch("addToCart", { productID, quantity });
      // },

      // async removeFromCart(cartID) {
      //   await this.$store.dispatch("removeFromCart", cartID);
      // },

      deleteItem(cartID) {
            console.log('Deleting item with cartID:', cartID);
            this.$store.dispatch("removeFromCart", cartID);
        }
    },
  
    created() {
      this.getUserID();
      console.log("cartItems:",this.$store.state.cartItems);
      console.log("Type of cartItems:", typeof this.$store.state.cartItems);
    }
};
</script>

<!-- <style scoped>
.modal {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.modal-header{
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    border-bottom: 2px solid gray;
    padding: 20px;
}
.modal-inner {  
  width: 555px;
  height: 250px;
  display: flex;
  justify-content: space-between;
}
.modal-inner{
    width: 222px;
    height: 250px;
    /* margin-inline: 20px; */
}

img{
    width: 222px;
    height: 250px;
}
.modal-info{
    width: 301px;
    height: 250px;
}

.modal-info .name h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 15px;
}

.actions{
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.input {
  display: flex;
}

.del-btn i{
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px #E4E4E4 solid;
  cursor: pointer;
}

.input button{
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px #E4E4E4 solid;
}
.input input{
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px #E4E4E4 solid;
  text-align: center;
}
</style> -->

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-bottom: 2px solid gray;
  padding: 20px;
}

.modal-inner {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Use 100% width to make it responsive */
  margin: 10px 0; /* Adjust margin as needed */
  border: 1px solid #e4e4e4;
  padding: 10px;
}

.modal-img img {
  width: 100%; /* Make the image responsive */
  max-width: 150px; /* Set a maximum width if needed */
  height: auto; /* Maintain aspect ratio */
}

.modal-info {
  flex-grow: 1; /* Allow this div to grow within its container */
  padding-left: 10px; /* Add some spacing */
}

.name h1 {
  font-size: 1.5em; /* Use relative font size */
  font-weight: bold;
  margin-top: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.input button,
.input input {
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
  font-size: 1.2em; /* Use relative font size */
}

.del-btn i {
  width: 30px;
  height: 30px;
  background: #fff;
  border: 1px #e4e4e4 solid;
  cursor: pointer;
  font-size: 1.2em; /* Use relative font size */
}

/* Media query for screens smaller than 768px */
@media screen and (max-width: 768px) {
  .modal-inner {
    flex-direction: column; /* Stack items vertically */
    text-align: center; /* Center-align text */
  }

  .modal-img img {
    max-width: 100%; /* Adjust image width */
    height: auto; /* Maintain aspect ratio */
  }

  .modal-info {
    padding-left: 0; /* Reset left padding */
    margin-top: 10px; /* Adjust top margin */
  }

  .name h1 {
    font-size: 1.2em; /* Reduce font size */
  }

  .actions {
    flex-direction: column; /* Stack buttons vertically */
    align-items: center; /* Center-align buttons */
    margin-top: 5px; /* Adjust top margin */
  }

  .input button,
  .input input {
    width: 40px; /* Adjust button and input width */
    height: 40px; /* Adjust button and input height */
  }

  .del-btn i {
    width: 40px; /* Adjust delete button width */
    height: 40px; /* Adjust delete button height */
    font-size: 1.4em; /* Increase font size */
    margin-top: 5px; /* Adjust top margin */
  }
}
</style>