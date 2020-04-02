<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="openFlag"
                width="30%"
                center>

            <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    props: {
      flag: {
        type: Boolean,
        default: false
      }
    },
    created() {
    },

    data() {
      return {
        openFlag: false
      }
    },
    // computed:{
    //   openFlag:function () {
    //     return this.flag;
    //   }
    // },
    watch: {
      flag: function (val) {
        this.openFlag = val;
        // console.log(val);
      }

    },
    methods: {
      close: function () {
        this.$emit('update:flag', false)
      }
    },
    mounted() {

    }

  }
</script>
<style lang="scss" scoped>

</style>