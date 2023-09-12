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
                              <input v-model="item.quantity" type="number" min="1">
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
    }
  },
  increaseQuantity(item) {
    item.quantity++;
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

<style scoped>
.modal {
  /* position: fixed; */
  /* top: 0;
  left: 0;
  width: 675px; */
  /* min-height: 1116px; */
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
}

.modal-img img{
    width: 100%;
    height: 100%;
}
.modal-info{
    width: 301px;
    height: 250px;
}

.modal-info .name h1 {
    font-size: 16px;
}
</style>