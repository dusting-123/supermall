<template>
  <div>
    <img :src="goodItem.show.img" alt="">
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodsItem: {
      type: Object,
      default() {}
    }
  }
}
</script>

<style>

</style>