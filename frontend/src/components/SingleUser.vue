<template>
<div class="main">
        <h2>IDENTITY</h2>

        <!-- <div class="user-img" v-if="user">
            <img :src="user.profileUrl" :alt="user.firstName">
        </div> -->


        <div class="card">
            <div class="card-body">
                <!-- <i class="fa fa-pen fa-xs edit"></i> -->
                <table>
                    <tbody v-if="user">
                        <tr>
                            <td>Profile</td>
                            <td>:</td>
                            <td><img :src="user.profileUrl" alt=""></td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>:</td>
                            <td>{{ user.userID }}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>{{ user.firstName }}</td>
                        </tr>
                        <tr>
                            <td>Surname</td>
                            <td>:</td>
                            <td>{{ user.lastName }}</td>
                        </tr>
                        <tr>
                            <td>Email Address</td>
                            <td>:</td>
                            <td>{{ user.emailAdd }}</td>
                        </tr>
                        <tr>
                            <td>User Role</td>
                            <td>:</td>
                            <td>{{ user.userRole }}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>:</td>
                            <td>{{ user.gender }}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>:</td>
                            <td>{{ user.userDOB }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    },

    mounted() {
        const userID = this.$route.params.userID;
        this.$store.dispatch("getUser", userID);
    },   
}
</script>

<style scoped>
.main {
    margin-top: 150px;
    margin-left: 29%;
    font-size: 28px;
    padding: 0 10px;
    width: 58%;
    /* display: flex;
    gap: 50px; */
    /* justify-content: space-around; */
}

.main h2 {
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 24px;
    margin-bottom: 10px;
}

.main .card {
    background-color: #fff;
    box-shadow: 1px 1px 8px 0 grey;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
}

tbody tr td img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
/* .user-img{
    background-color: #fff;
    box-shadow: 1px 1px 8px 0 grey;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
} */

.main .card table {
    border: none;
    font-size: 16px;
    height: 270px;
    width: 80%;
}

.edit {
    position: absolute;
    color: #e7e7e8;
    right: 14%;
}

</style>