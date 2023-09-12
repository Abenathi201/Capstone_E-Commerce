<template>
    <div>
        <div v-if="users">
            <UsersCard :users="users"/>
        </div>

        <div v-else>
            Processing...
        </div>
    </div>
</template>

<script>
import UsersCard from '@/components/UsersCard.vue';
export default {
    components: { UsersCard },

    computed: {
        users() {
            return this.$store.state.users;
        }
    },

    mounted() {
        this.$store.dispatch("getUsers")
    },
}
</script>

<style>
    
</style>