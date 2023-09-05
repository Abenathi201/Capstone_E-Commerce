import { createStore } from 'vuex'

const dbLink = "http://localhost:5000/";

export default createStore({
  state: {
    products: null,
    product: null,
    items: []
  },

  mutations: {
    setProducts: (state, products) => {
      state.products = products
    },

    setProduct: (state, product) => {
      state.product = product
    },

    setItems: (state, items) => {
      state.items = items
    },

    addItem: (state, item) => {
      state.items.push(item)
    },

    setDeleteItem: (state, cartID) => {
      // Find the index of the item to be removed in the cart
      const delItem = state.items.findIndex((item) => item.cartID === cartID);
  
      if (delItem !== -1) {
        // Remove the item from the cart by splicing it from the array
        state.cartItems.splice(delItem, 1);
      }
    },
  },

  actions: {
    async getProducts(context) {
      try{
        const response = await fetch(`${dbLink}products`);

        if(!response.ok) {
          throw Error("Failed to fetch products")
        } else {
          const data = await response.json();
          const products = data.results;
          context.commit("setProducts", products);
          console.log('Products fetched', products);
        }

      } 
      catch (err) {
        context.commit("Failed to get products", err.message)
      }
    },

    async getProduct(context, productID) {
      try {
        const response = await fetch(`${dbLink}products/${productID}`);

        if(!response.ok) {
          throw Error("Failed to get product")
        } else {
          const data = await response.json();
          const product = data.result[0];
          context.commit("setProduct", product);
          console.log(product);
        }
      } catch (err) {
        context.commit("Failed to get a single product", err.message)
      }
    },

    async getItems(context) {
      try{
        const response = await fetch(`${dbLink}items`);

        if(!response.ok) {
          throw Error("Could not retrieve items from cart")
        } else {
          const data = await response.json();
          const items = data.results;
          context.commit("setItems", items);
          console.log(items);
        }

      } catch (err) {
        context.commit("Failed to fetch cart items", err.message)
      }
    },

    // addItem (context, item) {
    //   try {
    //     context.commit("addItem", item);
    //   } catch (err) {
    //     context.commit("Failed to add item", err.message)
    //   }
    // },

    async addItem({ commit, state }, product) {
      try {
        const existingProduct = state.items.find((item) => item.productID === product.productID);
  
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          const response = await fetch(`${dbLink}add-item`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
  
          if (response.ok) {
            commit("addItem", product);
          } else {
            console.error('Error adding to cart:', response.statusText);
          }
        }
      } catch (error) {


        console.error('Error adding to cart:', error);
      }
    },

    async deleteItem({ commit }, cartID) {
      try {
        const response = await fetch(`${dbLink}items/${cartID}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          // If the deletion request was successful, commit the removeFromCart mutation
          commit('setDeleteItem', cartID);
        } else {
          // Handle errors if needed
          console.error('Error deleting item from cart:', response.statusText);
        }
      } catch (error) {
        // Handle other errors, e.g., network issues
        console.error('Error deleting item from cart:', error);
      }
    },
    
  }
})
