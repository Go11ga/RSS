<!-- Все новости -->
<template>
  <div>
    <app-cover :model="allNews" />
  </div> 
</template>

<script>
import AppCover from '@/components/news/cover'

export default {
  middleware: ['myMiddleware'],
   head: {
    title: 'Все новости'
  },
  components: {
    AppCover
  },
  computed: {
    allNews(){
      return this.$store.getters['news/allNews']
    }
  } 
}
</script>

<style lang="scss">
</style>