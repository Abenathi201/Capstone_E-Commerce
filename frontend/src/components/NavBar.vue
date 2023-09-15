<template>
  <div>
    <header :class="{ sticky: isSticky }">
      <div class="nav-bar">
        <a href="/" class="logo">BESTINTHEMERCH</a>
  
        <div class="navigation" :class="{ active: isNavigationActive }">
          <div class="nav-items">
            <i class="uil uil-times nav-close-btn" @click="closeNavigation"></i>
            <router-link class="links" to="/"><i class="uil uil-home"></i>Home</router-link>
            <router-link class="links" to="about">About</router-link>
            <router-link class="links" to="products">Products</router-link>
            <router-link class="links" to="contact"><i class="uil uil-envelope"></i>Contact</router-link>
            <!-- <router-link class="links" to="admin">Admin</router-link> -->
            <router-link class="links" v-if="userRole === 'admin'" to="/admin">Admin</router-link>
            <router-link class="links" v-if="userRole === 'admin'" to="/users">Users</router-link>
            <router-link class="links" v-if="userRole === 'user'" to="/userProfile">User</router-link>
          </div>
        </div>
  
        <div class="icons">
          <!-- <i class="uil uil-search"></i> -->
          <router-link to="/cart">
            <i class="uil uil-shopping-cart"></i>
  
          </router-link>
          <!-- <CartComp v-if="isModalVisible" @close="closeModal"></CartComp> -->
          <router-link :to="{ name: 'login' }" v-if="!authenticated"> <i class="uil uil-user"></i> </router-link>
          <!-- <button v-else @click="logout">Logout</button> -->
          <i class="uil uil-signout" @click="logout"></i>
          
        </div>
        <i class="uil uil-apps nav-menu-btn" @click="openNavigation"></i>
      </div>
    </header>

  </div>
</template>

<script>
import CartComp from './CartComp.vue';
export default {
    components: { CartComp },

    data() {
      return {
        isSticky: false,
        isNavigationActive: false,
        // isModalVisible: false,
      };
    },

    computed: {
        authenticated() {
          return this.$store.state.authenticated;
        },

        userRole() {
          return this.$store.state.userRole;
        }
    },
  
    methods: {
      openNavigation() {
          this.isNavigationActive = true;
      },

      closeNavigation() {
          this.isNavigationActive = false;
      },

      handleScroll() {
          this.isSticky = window.scrollY > 0;
      },
      

      // openModal() {
      //     // console.log('Open modal clicked');
      //     this.isModalVisible = true;
      // },

      // closeModal() {
      //     this.isModalVisible = false;
      // },

      logout() {
          this.$store.dispatch("logout");
        //   this.$router.push('/');
          window.location.reload();
        },
    },
  
    mounted() {
      window.addEventListener("scroll", this.handleScroll);

      const userData = JSON.parse(localStorage.getItem('userData'));
  const accessToken = localStorage.getItem('accessToken');

  if (userData && accessToken) {
    // Dispatch mutations to set user data and token in Vuex store
    this.$store.commit("setToken", accessToken);
    this.$store.commit("setUserData", userData);
    this.$store.commit("setUserRole", userData.result.userRole);
  }
    },
  
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style scoped>
header{
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 6rem;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    transition: 0.5s ease;
    /* transition-property: height, background; */
    background: #000;
    /* margin-bottom: 300px; */
}
header.sticky{
    height: calc(2.5rem + 1rem);
    background: black;
    backdrop-filter: blur(20px);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.nav-bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 200px;
    transition: 0.3s ease;
}

.nav-close-btn, .nav-menu-btn{
    display: none;
}

.nav-bar .logo{
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    text-shadow: 0 5px 25px rbga(0, 0, 0, 0.1);
}
.navigation .nav-items .links{
    color: #fff;
    font-size: 1em;
    text-decoration: none;
    text-shadow: 0 5px 25px rbga(0, 0, 0, 0.1);
}

.navigation .nav-items a i{
    display: none;
}

.icons i{
    margin-inline: 5px;
    color: #fff;
    font-size: 30px;
    text-decoration: none;
    text-shadow: 0 5px 25px rbga(0, 0, 0, 0.1);
    cursor: pointer;
}

.navigation .nav-items a:not(:last-child){
    margin: 45px;
}
/*===== HEADER  =====*/

@media screen and (max-width: 785px){
    .nav-bar{
        padding: 25px 20px;
    }
    /*===== NAVIGATION MENU  =====*/
    .nav-menu-btn{
        display: block;
        color: #fff;
        font-size: 1.5em;
        cursor: pointer;
    }
    .nav-close-btn{
        display: block;
        color: var(--dark-color);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.5em;
        margin: 10px;
        cursor: pointer;
        transition: 0.3s ease;
    }
    .navigation{
        z-index: 99999;
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: 0.3s ease;
    }
    .navigation.active{
        visibility: visible;
        opacity: 1;
    }
    .navigation .nav-items{
        position: relative;
        background: var(--white-color);
        width: 400px;
        /* height: 500px; */
        max-width: 400px;
        display: grid;
        place-content: center;
        /* margin: 20px; */
        /* padding: 40px; */
        border-radius: 20px;
        box-shadow: var(--box-shadow);
        transform: translateY(-80px);
        transition: 0.3s ease;
    }
    .navigation.active .nav-items{
        transform: translateY(0);
    }
    .navigation .nav-items a{
        color: var(--dark-color);
        font-size: 1em;
        margin: 40px;
        transition: 0.3s ease;
    }
    .navigation .nav-items a:hover{
        color: var(--navigation-item-hover-color);
    }
    .navigation .nav-items a i{
        display: inline-block;
        font-size: 1.3em;
        margin-right: 5px;
    }
}
</style>
