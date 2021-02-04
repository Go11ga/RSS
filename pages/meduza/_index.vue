<!-- Новости meduza.io -->
<template>
  <div>
    <app-cover :model="meduzaNews"/>
  </div> 
</template>

<script>
import AppCover from '@/components/news/cover'

export default {
  components: {
    AppCover
  },
   head: {
    title: 'Медуза'
  },
  computed: {
    meduzaNews(){
      return this.$store.getters['news/meduzaNews']
    }
  }
}
</script>

<style lang="scss">
</style>