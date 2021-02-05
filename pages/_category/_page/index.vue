<!-- Все новости -->
<template>
  <div>
    <app-cover :model="news" />
  </div> 
</template>

<script>
import AppCover from '@/components/news/cover'

export default {
  components: {
    AppCover
  },
  computed: {
    news () {
      return this.$store.getters['news/category']
    },
    category () {
      return this.$route.params.category
    }
  },
  fetch () {
    this.$store.commit('news/setCategory', this.category)
  }
}
</script>

<style lang="scss">
</style>