import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import Cookies from "js-cookie";
import router from '@/router';

const dbLink = "https://capstone-e-commerce.onrender.com/";

export default createStore({
  state: {
    products: null,
    product: null,
    items: [],
    deleteProduct: null,
    user: null,
    users: null,
    userData: null,
    userRole: null,
    token: null,
    cartItems: [],
    authenticated: false,
    deleteUser: null,
  },

  mutations: {

    setProducts: (state, products) => {
      state.products = products
    },

    setProduct: (state, product) => {
      state.product = product
    },

    setUsers: (state, users) => {
      state.users = users
    },

    removeFromCart(state, cartID) {
      state.items = state.items.filter(item => item.cartID !== cartID);
    },

    setUser: (state, user) => {
      state.user = user
    },

    setUserData(state, userData) {
      state.userData = userData;
    
      if (userData) {
        const userDataForCookie = {
          msg: userData.msg,
          token: userData.token,
          result: userData.result,
        };
    
        Cookies.set("userData", JSON.stringify(userDataForCookie), {
          expires: 1,
          path: "/",
          secure: true,
          sameSite: "None",
        });
      }
    },
    
    setToken(state, token) {
      state.token = token;
      Cookies.set("userToken", token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      state.authenticated = true;
    },

    setUserRole(state, userRole) {
      state.userRole = userRole;
    },

    setError(state, error) {
      state.error = error;
    },

    setUserDelete(state, deleteUser) {
      state.deleteUser = deleteUser;
    },

    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },

    addToCart(state, { productID, quantity }) {
      const cartItem = state.cartItems.find(item => item.productID === productID);

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        const newItem = {
          productID: productID,
          quantity: quantity,
        };
        state.cartItems.push(newItem);
      }
    
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    updateQuantity(state, { cartID, quantity }) {
      const item = state.cartItems.find(item => item.cartID === cartID);
  
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    },
  
    removeFromCart(state, cartID) {
      state.cartItems = state.cartItems.filter(item => item.cartID !== cartID);
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
        this.Categories = ''

        context.dispatch('getProducts');
        this.$router.push('/admin'); 
      } catch (error) {
        alert(error);
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
    
        if (!response.ok) {
          throw new Error(`Failed to login user. Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.token) {
          const userData = {
            msg: data.msg,
            token: data.token,
            result: data.result,
          };

      const accessToken = data.token;

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('accessToken', accessToken);
      context.commit('setUser', data.user);
      context.commit("setToken", data.token);
      context.commit("setUserData", userData);
      context.commit("setUserRole", data.result.userRole);

      return data;
      } else {
        console.error("Login failed:", data.msg);
        return data;
      }
      } catch (error) {
        console.error('Error logging in user:', error);
        context.commit("setError", error.message);
        throw error;
      }
    },

    async getUsers(context) {
      try{
        const response = await fetch(`${dbLink}users`);

        if(!response.ok) {
          throw Error("Failed to fetch users")
        } else {
          const data = await response.json();
          const users = data.results;
          context.commit("setUsers", users);
          console.log('Users fetched', users);
        }

      } 
      catch (err) {
        context.commit("Failed to get users", err.message)
      }
    },

    async getUser(context, userID) {
      try {
        const response = await fetch(`${dbLink}users/${userID}`);

        if(!response.ok) {
          throw Error("Failed to get user")
        } else {
          const data = await response.json();
          const user = data.result[0];
          context.commit("setUser", user);
          console.log(user);
        }
      } catch (err) {
        context.commit("Failed to get a single user", err.message)
      }
    },

    async deleteUser(context, userID) {
      try {
        context.commit("setUserDelete", null);
        const response = await fetch(`${dbLink}users/${userID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`failed to delete product. Status: ${response.status}`);
        }
        context.commit("deleteUser", userID);
        context.commit("setUserDelete", "success");
      } catch (error) {
        console.log("error deleting product:", error)
        context.commit("setUserDelete", "error")
      }
    },

    logout(context) {
      context.commit("setToken", null);
      context.commit("setUserData", null);
      context.commit("setUserRole", null);
      
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
    
      Cookies.remove("userToken", { path: "/" });
      Cookies.remove("userData", { path: "/" });
    
      window.location.reload();
    },

    async getCartItems(context) {
      const userData = context.state.userData;
      console.log("User Data", userData);

      const userID = context.state.userData?.result?.userID;
    
      if (userID) {
        try {
          const response = await fetch(`${dbLink}items/${userID}`);
          if (!response.ok) {
            throw Error("Failed to retrieve cart items");
          }
          const data = await response.json();
          console.log(data);
          const cartItems = data.results;
          context.commit("setCartItems", cartItems);
          console.log(cartItems);
        } catch (error) {
          context.commit("setError", error.message);
        }
      } else {
        console.error('User data or userID not found in state');
      }
    },    
  
    async addToCart(context, { productID, quantity }) {
      try {
        const userID = context.state.userData.result.userID;
        console.log("User DD:", userID);
        const response = await fetch(`${dbLink}add-items/${userID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID, quantity }),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to add item to cart. Status: ${response.status}`);
        }
    
        const data = await response.json();
        const cartItem = context.state.cartItems.find(item => item.productID === productID);
    
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          const newItem = {
            productID: productID,
            quantity: quantity,
          };
          context.commit("addToCart", newItem);
        }
      } catch (error) {
        context.commit("setError", error.message);
      }
    },

    async updateCartQuantity(context, {  cartID, quantity }) {
      try {
        const userID = context.state.userData.result.userID;
        const response = await fetch(`${dbLink}items/${userID}/${cartID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        });
  
        if (!response.ok) {
          throw Error("Failed to update item quantity in cart");
        }
  
        context.commit("updateQuantity", { cartID, quantity });
      } catch (error) {
        context.commit("setError", error.message);
      }
    },
  
    async removeFromCart(context, cartID) {
      const userID = context.state.userData.result.userID;
      console.log("User ID:", userID, "Cart ID:", cartID);
      try {
        const response = await fetch(`${dbLink}items/${userID}/${cartID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw Error("Failed to remove item from cart");
        }
        context.commit("removeFromCart", cartID);
      } catch (error) {
        context.commit("setError", error.message);
      }
    },
      
  }
})