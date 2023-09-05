<template>
    <div class="modal">
        <div class="modal-header">
            <h1>Shopping Cart</h1>
            <h2 @click="close">X</h2>
        </div>

        <!-- <div class="modal-inner">

            <div class="modal-img">
                <img src="https://i.postimg.cc/W4BDCrcz/aew2174-1-cmpunk-sting-sting.png" alt="cmpunk">
            </div>

            <div class="modal-info">
                <div class="name">
                    <h1>CM Punk Sting and Darby Allin Tee</h1>
                    <h1>$15.00</h1>
                </div>

                <div class="actions">
                    <div class="input">

                    </div>

                    <div class="del-btn">
                        <i class="uil uil-trash-alt"></i>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="modal-inner" v-for="item in items" :key="item.productID">

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

                    </div>

                    <div class="del-btn">
                        <i class="uil uil-trash-alt" @click="deleteItem(item.productID)"></i>
                    </div>
                </div>
            </div>
        </div>


    </div>
  </template>

<script>
export default {  
    methods: {
        close() {
          this.$emit("close");
        },

        deleteItem(item) {
          // Pass only the cartID when calling the deleteItem action
          this.$store.dispatch("deleteItem", item);
        }
    },

    computed: {
        items() {
            return this.$store.state.items;
        }
    },

    mounted() {
        this.$store.dispatch("getItems");
    }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 675px;
  min-height: 1116px;
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