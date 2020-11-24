<template>
  <!-- Новости meduza.io -->
  <div>
    <TheNewsCover :news="meduzaNews"/>
  </div> 
</template>

<script>
export default {
  computed: {
    /**
      * Получение новостей mos
      */
    meduzaNews(){
      return this.$store.getters['news/meduzaNews']
    }
  }
}
</script>

<style lang="scss">
</style>