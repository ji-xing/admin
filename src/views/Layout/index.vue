<template>
    <div>
        <LayoutNav></LayoutNav>
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
    </div>
</template>
<script>
    import LayoutNav from "./components/Nav"
    import LayoutHeader from "./components/Header.vue"
    import LayoutMain from "./components/Main.vue"
  export default {
      components:{LayoutNav, LayoutHeader,LayoutMain },
    data(){
        return{

        }
    },
    created() {

    }
  }
</script>
<style lang="scss" scoped>

</style>