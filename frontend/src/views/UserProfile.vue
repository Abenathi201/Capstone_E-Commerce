<template>
    <div>
      <h2>User Profile</h2>
      
      <div v-if="userData">
        <p>First Name: {{ userData.firstName }}</p>
        <p>Last Name: {{ userData.lastName }}</p>
        <p>Email: {{ userData.emailAdd }}</p>
        <p>Gender: {{ userData.gender }}</p>
        <p>Date of Birth: {{ userData.userDOB }}</p>
        <p>Role: {{ userData.userRole }}</p>
        <p>Profile URL: {{ userData.profileUrl }}</p>
      </div>
  
      <button @click="editProfile">Edit Profile</button>
      <button @click="deleteProfile">Delete Profile</button>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      userData: null
    };
  },
  methods: {
    editProfile() {
      // Logic for editing profile
    },

    async deleteProfile() {
    if (this.userData && this.userData.result && this.userData.result.userID) {
      const userID = this.userData.result.userID;
      console.log("Deleting:", userID);
      try {
        await this.$store.dispatch('deleteUser', userID);
        // Logout user
        await this.$store.dispatch('logout');

        // Clear user data from local storage
        localStorage.removeItem('userData');

        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      console.error('User data or userID not available.');
    }
  }

  },
  created() {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('Stored User Data:', storedUserData);
    if (storedUserData && storedUserData.result) {
      this.userData = storedUserData;
    } else {
      console.error('User data not found in local storage');
    }
  }


}
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  