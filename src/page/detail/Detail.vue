<template>
  <div>
      {{iid}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      iid:null
    }
  },
  created(){
    console.log(this.$route.params.iid);
    this.iid = this.$route.params.iid
  },
}
</script>

<style>

</style>