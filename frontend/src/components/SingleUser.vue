<template>
    <div>
        
    </div>
</template>
<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    },

    // methods: {
    //     addItem(product) {
    //       this.$store.dispatch("addItem", product);
    //     }
    // },

    mounted() {
        const userID = this.$route.params.userID;
        this.$store.dispatch("getUser", userID);
    },   
}
</script>
<style scoped>
    
</style>