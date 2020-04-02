<template>
    <div id="nav_warp">
        <h1 class="logo"><img src="../../../assets/imgs/logo.png" alt=""></h1>
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#344a5f"
                 text-color="#fff"
                 active-text-color="#fff"
                 router
                 :collapse="isCollapse">
            <!--  一级菜单      -->
         <template v-for="(item,index) in router "  >
             <el-submenu  v-if="!item.hidden" :index="index+''">
                 <template slot="title">
                     <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
                     <span slot="title">{{item.meta.name}}</span>
                 </template>
                 <!--   二级菜单         -->
                 <el-menu-item-group v-for="val in item.children" :key="val.id">
                     <el-menu-item :index="val.path" >{{val.meta.name}}</el-menu-item>
                 </el-menu-item-group>
             </el-submenu>
         </template>

        </el-menu>
    </div>

</template>
<script>
  export default {
    data() {
      return {
        // isCollapse: false,
        router:this.$router.options.routes
      };
    },
    // watch:{
    //   isCollapse:function () {
    //     isCollapse=this.$store.getters['app/get_collapse'];
    //   }
    // },
    computed:{
      isCollapse:function () {
     return this.$store.getters['app/get_collapse']
  }
    },
    created(){
      console.log(this.$store.getters['app/get_collapse'])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav_warp{
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
    .logo{
        text-align: -webkit-center;
        margin: 28px auto 25px;
       img{
           width: 92px;
           height: 92px;
       }
    }
}


</style>