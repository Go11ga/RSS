<template>
  <div class="header">
		<!-- Заголовок и кнопка обновления -->
    <div class="header__item">
      <h2 class="header__text">Список новостей</h2>
      <div class="header__refresh" @click="onRefresh">
        <img class="header__img" src="~/assets/img/Vector.png" alt="refresh">
      </div>
    </div>

		<!-- Поиск -->
    <div class="header__item">
      <div class="header__input-group">
        <input class="header__input" type="text" v-model="searchValue" @keyup.enter="onSearch">
          <button class="header__btn" @click="onSearch">
            <img src="~/assets/img/Stroke.png" alt="search">
          </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onRefresh () {
      this.$store.dispatch('news/getNews')
    },
    onSearch () {
      this.$store.commit('news/setSearchValue', this.searchValue)
    }
  }
}
</script>


<style lang="scss" scoped>
	.header {
		padding: 36px 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		border-bottom: 1px solid $grey;
  }

  .header__item {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		@media (max-width: $point_md) {
			width: 100%;
			justify-content: space-between;
		}
  }

  .header__text {
		color: $black;
		font-family: arial;
		font-weight: 700;
		font-style: normal;
		font-size: 36px;
		line-height: 41px;

		@media (max-width: $point_sm) {
			font-size: 24px;
      line-height: 27px;
		}
  }

  .header__refresh {
		margin-left: 30px;
		width: 40px;
		height: 40px;

		border-radius: 50%;
		background: $white;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);

		position: relative;

		transition: all .2s linear;

		&:hover {
			cursor: pointer;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
		}
	}
	
  .header__img {
		position: absolute;

		top: 50%;
		left: 50%;
		z-index: 1;
		transform: translate(-50%, -50%);
  }

	.header__input-group {
		position: relative;

		@media (max-width: $point_md) {
			margin-top: 23px;
      width: 100%;
		}
	}

  .header__input {
		width: 320px;
		height: 40px;
		padding-left: 20px;

		background-color: $white;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
		border-radius: 3px;
		border: 0;

		&:focus {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      outline: 0;
		}
		
		@media (max-width: $point_sm) {
        width: 100%;
		}
  }

  .header__btn {
		width: 20px;
		height: 20px;

		border: 0;
		background-color: transparent;
		cursor: pointer;
		outline: 0;

		position: absolute;

		top: 50%;
		right: 13px;
		z-index: 1;
		transform: translate(0, -50%);

		&:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
</style>