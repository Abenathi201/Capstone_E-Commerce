<template>
    <div class="signup-form">
    <div class="container">
      <div class="header">
        <h1>Create an Account</h1>
        <p>Get started for free!</p>
      </div>
      <form @submit.prevent="loginUser">
        <div class="input">
          <i class="fa-solid fa-envelope"></i>
          <input type="emailAdd" id="emailAdd" v-model="userInfo.emailAdd" placeholder="Email" />
        </div>
        <div class="input">
          <i class="fa-solid fa-lock"></i>
          <input type="password" id="userPass" v-model="userInfo.userPass" placeholder="Password" />
        </div>
        <input class="signup-btn" type="submit" value="LOGIN" />
      </form>
      <p>Or Login with</p>
      <div class="social-icons">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-google"></i>
      </div>
      <p>Don't have an account <router-link :to="{ name: 'register' }">Register Up Here</router-link></p>
    </div>
  </div>
  </template>
  
<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      userInfo: {
        emailAdd: "",
        userPass: "",
      },
    };
  },
  methods: {
  async loginUser() {
    try {
      const userData = {
        emailAdd: this.userInfo.emailAdd,
        userPass: this.userInfo.userPass,
      };

      const resp = await this.$store.dispatch("login", userData);

      if (resp.success && resp.token) {
        await Swal.fire({
          icon: "success",
          title: "Logged in Successfully",
          text: "You are now logged in!",
        });
        this.$router.push("/");
      } else {
        const errMsg = resp.error || "Unexpected error";
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: errMsg,
        });
      }
    } catch (e) {
      console.error("Error while logging in: ", e);
    }
  },
},

};
</script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    outline-color: #a5b4fc;
  }
  
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background-color: #e2e8f0;
  }
  
  p {
    font-size: 14px;
    color: #6b7280;
  }
  
  .signup-form {
    width: 480px;
    padding: 32px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 2px 4px 8px #6b728040;
    text-align: center;
  }
  
  .header {
    margin-bottom: 48px;
  }
  
  .header h1 {
    font-weight: bolder;
    font-size: 28px;
    color: #6366f1;
  }
  
  .input {
    position: relative;
    margin-bottom: 24px;
  }
  
  .input input {
    width: 100%;
    border: none;
    padding: 8px 40px;
    border-radius: 4px;
    background-color: #f3f4f6;
    color: #1f2937;
    font-size: 16px;
  }
  
  .input input::placeholder {
    color: #6b7280;
  }
  
  .input i {
    top: 50%;
    width: 36px;
    position: absolute;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 16px;
  }
  
  .signup-btn {
    width: 100%;
    border: none;
    padding: 8px 0;
    margin: 24px 0;
    border-radius: 4px;
    background-color: #6366f1;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  
  .signup-btn:active {
    background-color: #4f46e5;
    transition: all 0.3s ease;
  }
  
  .social-icons i {
    height: 36px;
    width: 36px;
    line-height: 36px;
    border-radius: 50%;
    margin: 24px 8px 48px 8px;
    background-color: gray;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
  
  i.fa-facebook-f {
    background-color: #3b5998;
  }
  
  i.fa-twitter {
    background-color: #1da1f2;
  }
  
  i.fa-google {
    background-color: #dd4b39;
  }
  
  a {
    color: #6366f1;
    text-decoration: none;
  }
  
  </style>