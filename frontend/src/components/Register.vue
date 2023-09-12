<template>
  <div class="signup-form">
    <div class="container">
      <div class="header">
        <h1>Create an Account</h1>
        <p>Get started for free!</p>
      </div>
      <form @submit.prevent="registerUser">
        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.firstName" type="text" placeholder="First Name..." required />
        </div>

        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.lastName" type="text" placeholder="Last Name..." required />
        </div>

        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.gender" type="text" placeholder="Your Gender..." required />
        </div>

        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.userDOB" type="date" placeholder="Your Date of Birth..." required />
        </div>

        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.userRole" type="text" placeholder="I.E User or Admin..." required />
        </div>

        <div class="input">
          <i class="fa-solid fa-envelope"></i>
          <input v-model="users.emailAdd" type="email" placeholder="Email" required />
        </div>

        <div class="input">
          <i class="fa-solid fa-lock"></i>
          <input v-model="users.userPass" type="password" placeholder="Password" required />
        </div>

        <div class="input">
          <i class="fa-solid fa-user"></i>
          <input v-model="users.profileUrl" type="text" placeholder="Profile URL" required />
        </div>

        <input class="signup-btn" type="submit" value="REGISTER" />
      </form>

      <p>Or sign up with</p>
      <div class="social-icons">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-google"></i>
      </div>
      <p>Already have an account <router-link :to="{ name: 'login' }">Login Up Here</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: {
        firstName: "",
        lastName: "",
        gender: "",
        userDOB: "",
        userRole: "",
        emailAdd: "",
        userPass: "",
        profileUrl: "",
      }
    };
  },
  methods: {
    async registerUser() {
      
      const user = {
        firstName: this.users.firstName,
        lastName: this.users.lastName,
        gender: this.users.gender,
        userDOB: this.users.userDOB,
        userRole: this.users.userRole,
        emailAdd: this.users.emailAdd,
        userPass: this.users.userPass,
        profileUrl: this.users.profileUrl
      };
      this.$store.dispatch("registerUser", user);
      console.log(this.$store.state.token);
    }
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

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
} */

p {
  font-size: 14px;
  color: #6b7280;
}

.signup-form {
  width: 480px;
  padding: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  position: absolute;
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