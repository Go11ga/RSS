<!-- Новости lenta.ru -->
<template>
  <div>
    <app-cover :model="lentaNews"/>
  </div> 
</template>

<script>
import AppCover from '@/components/news/cover'

export default {
  components: {
    AppCover
  },
   head: {
    title: 'Лента'
  },
  computed: {
    lentaNews(){
      return this.$store.getters['news/lentaNews']
    }
  }
}
</script>

<style lang="scss">
</style>