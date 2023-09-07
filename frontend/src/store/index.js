import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import Cookies from "js-cookie";

const dbLink = "http://localhost:5000/";

export default createStore({
  state: {
    products: null,
    product: null,
    items: [],
    deleteProduct: null,
    token: null,
    user: null,
    userData: null,
    userRole: null,
    msg: null,
    error: null,
    regStatus: null,
    logStatus: null,
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

    setDelete: (state, deleteProduct) => {
      state.deleteProduct = deleteProduct;
    },

    setRegStatus(state, status) {
      state.regStatus = status;
    },

    setLogStatus(state, status) {
      state.logStatus = status;
    },

    setToken(state, token) {
      state.token = token;
      Cookies.set("userToken", token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "None",
      });
    },

    setToken: (state, token) => {
      state.token = token;
      Cookies.set("userToken", token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "None",
      });
    },

    setUser: (state, user) => {
      state.user = user
    },

    setUserData(state, userData) {
      state.userData = userData;
      if (userData && userData.userRole) {
        state.userRole = userData.userRole;
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData, userData.userRole);
      } else {
        state.userData = null;
        state.userRole = null;
        localStorage.removeItem("userData");
      }
    },

    setMsg(state, msg) {
      state.msg = msg;
    },

    setError(state, error) {
      state.error = error;
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

    async addProduct(context, newProduct) {
      try {
        const response = await fetch(`${dbLink}product-add`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
          throw new Error(`Failed to add product. Status: ${response.status}`);
        } 
        await context.dispatch("getProducts");
        console.log("Product added successfully!")
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },

    async deleteProduct(context, productID) {
      try {
        context.commit("setDelete", null);
        const response = await fetch(`${dbLink}products/${productID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`failed to delete product. Status: ${response.status}`);
        }
        context.commit("removeProduct", productID);
        context.commit("setDelete", "success");
      } catch (error) {
        console.log("error deleting product:", error)
        context.commit("setDelete", "error")
      }
    },

    async updateProduct(context, product) {
      try {
        const response = await fetch(`${dbLink}products/${product.productID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
         }
        );
        if (!response.ok) {
          throw new Error(`failed to update product : ${response.status}`);
        }
        this.productName = '';
        this.productPrice = '';
        this.imageURL = '';
        this.description = '';
        this.quantity = '';

        context.dispatch('getProducts');
        this.$router.push('/admin'); 
      } catch (error) {
        alert(error);
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

    async registerUser(context, userData) {
      try {
        const response = await fetch(`${dbLink}register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        
    
        if (!response.ok) {
          throw new Error(`Failed to register user. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.status === 200) {
          // Registration successful
          context.commit("setToken", data.token); // Committing setToken mutation
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: data.msg,
          });
        } else {
          // Registration failed
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: data.msg,
          });
        }
      } catch (error) {
        console.error('Error registering user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error registering user: ${error.message}`,
        });
      }
    },

    async login(context, userData) {
      try {
        const response = await fetch(`${dbLink}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
    
        // Log the entire response from the server
        console.log(response);
    
        if (!response.ok) {
          console.error(`Failed to login user. Status: ${response.status}`);
          context.commit("setError", `Failed to login user. Status: ${response.status}`);
          context.commit("setLogStatus", "Not logged in");
          return { success: false, error: `Failed to login user. Status: ${response.status}` };
        }
    
        const data = await response.json();
    
        if (data.msg === "You are providing the wrong email or password") {
          context.commit("setError", data.msg);
          context.commit("setLogStatus", "Not logged in");
          return { success: false, error: data.msg };
        }
    
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.userData));
    
          context.commit("setUser", data.userData);
          context.commit("setToken", data.token);
    
          console.log("User logged in:", data.userData);
    
          context.commit("setLogStatus", data.message);
    
          return { success: data.success, token: data.token };
        } else if (data.err) {
          context.commit("setToken", null);
          context.commit("setError", data.err);
          return { success: false, error: data.err };
        } else {
          context.commit("setError", "Unknown error during login");
          context.commit("setLogStatus", "not logged in");
          return { success: false, error: "Unknown error" };
        }
      } catch (error) {
        console.error("Error logging in user:", error);
        context.commit("setError", "An error occurred while trying to log in");
        context.commit("setLogStatus", "Not logged in");
        return { success: false, error: "Network error" };
      }
    },    
    
  }
})
