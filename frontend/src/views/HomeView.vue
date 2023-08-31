<template>
  <div class="home">
    <HomeComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComp from '@/components/HomeComp.vue'

export default {
  name: 'HomeView',
  components: {
    HomeComp
  }
}
</script>
