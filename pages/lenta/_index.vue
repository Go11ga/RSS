<template>
  <!-- Новости lenta.ru -->
  <div>
    <TheNewsCover :news="lentaNews"/>
  </div> 
</template>

<script>
export default {
  computed: {
    /**
      * Получение новостей lenta
      */
    lentaNews(){
      return this.$store.getters['news/lentaNews']
    }
  }
}
</script>

<style lang="scss">
</style>