<template>
  <!-- Все новости -->
  <div>
    <TheNewsCover :news="allNews"/>
  </div> 
</template>

<script>
export default {
  computed: {
    /**
      * Получение всех новостей
      */
    allNews(){
      return this.$store.getters['news/allNews']
    }
  },
  middleware: ['myMiddleware']
}
</script>

<style lang="scss">
</style>