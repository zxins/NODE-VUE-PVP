<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/7ad0f3c893c3a42ff9113c14b29aeb3a.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/c984fbb6b4df4835faf9b5b0a48a0463.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/58d38f5a3aa9d152968c746d08ac99d6.jpeg">
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!--  end of swipper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 text-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        },
        // Some Swiper option/callback...
      }
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.154rem;
    background-color: map-get($colors, 'white');

    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
