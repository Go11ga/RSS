<template>
  <div 
    class="toast"
    :class="{'toast--active' : showMsg}"
  >
    {{text}}
  </div>
</template>

<script>
	export default {
		computed: {
      showMsg(){
        return this.$store.getters['msg/showMsg'];
      },
      text(){
        return this.$store.getters['msg/text'];
      }
    }
	}
</script>


<style lang="scss">
  .toast {
    width: 50%;
    height: 100px;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgb(235, 69, 69);

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;

    font-size: 36px;
    color: #fff;

    &--active {
      display: flex;
    }
  }
</style>
