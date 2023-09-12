<template>
    <div>
        <div class="card" v-for="user in users" :key="user.userID">
            <router-link :to="{ name: 'user', params: { userID: user.userID } }">
                <div class="card-img">
                    <img :src="user.profileUrl" :alt="user.firstName">
                </div>
            </router-link>

            <div class="desc">
                <h3> {{ user.firstName }} {{ user.lastName }} </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["users"]
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
</style>