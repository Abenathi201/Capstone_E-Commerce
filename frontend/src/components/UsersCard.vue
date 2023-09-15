<template>
    <div>
        <!-- <div class="card" v-for="user in users" :key="user.userID">
            <router-link :to="{ name: 'user', params: { userID: user.userID } }">
                <div class="card-img">
                    <img :src="user.profileUrl" :alt="user.firstName">
                </div>
            </router-link>

            <div class="desc">
                <h3> {{ user.firstName }} {{ user.lastName }} </h3>
            </div>
        </div> -->

        <div class="wrapper" v-for="user in users" :key="user.userID">
          <div class="user-card">
            <div class="user-card-img">
              <img :src="user.profileUrl" :alt="user.firstName">
            </div>
            <div class="user-card-info">
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              <p><span>Email:</span> {{ user.emailAdd }}</p>
              <p><span>Gender:</span> {{ user.gender }}</p>
              <p><span>User Role:</span> {{ user.userRole }}</p>
              <router-link :to="{ name: 'user', params: { userID: user.userID } }">View Morer</router-link>
              <button @click="deleteUser(user.userID)">Delete User</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["users"],

    computed:{
      user(){
        return this.$store.state.user
      }
    },

    methods: {
      deleteUser(userID) {
        console.log("Deleting User:", userID);
        this.$store.dispatch("deleteUser", userID)
      }
    },

    mounted() {
      this.$store.dispatch("getUsers")
    },
}
</script>

<style scoped>
.card{
    width: 270px;
    height: 372px;
}

.card-img img{
    width: 100%;
    height: 100%;
}

.card .desc {
    text-align: center;
}
.card .desc h3 {
    text-align: center;
    font-size: 16px;
}
.card .desc h4 {
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12%;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  width: 650px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 20px -5px rgba(0,0,0,0.5);
}

.user-card:before {
  content: '';
  position: absolute;
  height: 300%;
  width: 173px;
  background: #262626;
  top: -60px;
  left: -125px;
  z-index: 0;
  transform: rotate(17deg);
}

.user-card-img {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.user-card-img img {
  width: 150px;
  height: 200px;
  object-fit: cover;
}

.user-card-info {
  text-align: center;
}

.user-card-info h2 {
  font-size: 24px;
  margin: 0;
  margin-bottom: 10px;
  font-family: 'Bebas Neue', sans-serif;
}

.user-card-info p {
  font-size: 14px;
  margin-bottom: 2px;
}

.user-card-info p span {
  font-weight: 700;
  margin-right: 10px;
}
</style>