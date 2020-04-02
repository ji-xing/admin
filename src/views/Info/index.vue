<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="5">
                <label for="">分类</label>
                <el-select v-model="categoryVal" placeholder="请选择"
                           style="width: 100px; margin-left: 16px;">
                    <el-option
                            v-for="item in category_options"
                            :key="item.id"
                            :label="item.category_name"
                            size="mini"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7">
                <label for="">日期</label>
                <el-date-picker
                        style="margin-left: 12px; width: 213px;"
                        v-model="timeVal"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="5">
                <label for="">关键字</label>
                <el-select v-model="keyWord" placeholder="请选择"
                           style="width: 91px;margin-left: 16px;">
                    <el-option
                            v-for="item in keywordList"
                            :key="item.id"
                            :label="item.label"
                            size="mini"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-input v-model="serach_input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="4" style="line-height: 40px;">
                <el-button size="small" type="danger">搜索</el-button>
                <el-button size="small" @click="openDialogInfo = true"  type="danger">新增</el-button>
            </el-col>
        </el-row>


     <!--        弹窗-->
        <dialogInfo :flag.sync="openDialogInfo" ></dialogInfo>
    </div>
</template>
<script>
    import dialogInfo from "./dialog/info.vue";
    import { GetCategory, GetCategoryAll } from "@/api/news";
  export default {
    components:{
      dialogInfo
    },
    data() {
      return {
  // 分类的数据
        category_options: [],
        categoryVal: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeVal: '',
        keywordList:[
          {
            value: '选项1',
            label: 'ID'
          },
          {
            value: '选项2',
            label: '标题'
          }
        ],
        keyWord:"",
        //搜索文本框的内容
        serach_input:"",
        openDialogInfo:false
      }
    },
    mounted() {
    },
    created() {
      this.$store.dispatch("commom/GetFirstCatogory").then((res)=>{
        console.log(res);
        this.category_options=res.data;
        console.log(this.category_options);
      }).catch((error)=>{
        console.log(error)
      })
    }

  }
</script>
<style lang="scss" scoped>

</style>