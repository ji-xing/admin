<template>
    <div class="header">

        <el-row >
            <el-col   :span="3">
                <div @click="changeStatus">
                    <svg-icon  :iconClass="menu" :className="menu"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="width: 235px;height: 75px;"></div>
            </el-col>
            <el-col :span="3">
                <img src="../../../assets/imgs/face.jpg" alt="">
            </el-col>
            <el-col :span="6">
              <span>1165510700@qq.com</span>
            </el-col>
            <el-col :span="4">
                <svg-icon :iconClass="exit" :className="exit"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        menu:"menu",
        exit:"exit"
      }
    },
    methods:{
      changeStatus:function () {
        this.$store.commit("app/SET_COLLAPSE");
      },

    }
  }
</script>
<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    .header {
        position: fixed;
        top: 0;
        right: 0;
        left: $navMenu;
        height: 75px;
        background-color: #fff;
        line-height: 75px;
        text-align: center;
        img{
            display: inline-block;
            margin-bottom: -8px;
            margin-right: 18px;
            border-radius: 50px;
        }
    }

</style>