<template>
  <div class="main" style="padding-top: 47px">
      <router-view/>
  </div>
</template>
<script>
  export default {
// components:

  }
</script>
<style lang="scss" scoped>
.main{
    position: fixed;
    left: 250px;
    top:50px;
    bottom: 0;
    right: 0;
    padding: 30px 30px 0 30px;
    background-color: #fff;
}
</style>