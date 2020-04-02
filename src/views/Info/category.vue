<template>
    <div id="info">
        <div class="header">
            <el-button @click="addFirst('category_first_add')" type="danger">添加一节分类</el-button>
        </div>
        <div class="main">
            <div class="main_left">
               <template v-for="val in category.item">
                   <h2 >{{val.category_name}}
                       <div class="button_group">
                           <el-button size="mini" @click="editCategory({ data: val, type: 'category_first_edit' })" type="danger">编辑</el-button>
                           <el-button size="mini" @click="handlerAddChildren({data:val,type:'category_children_add'})" type="success">添加子级</el-button>
                           <el-button size="mini" @click="deleteCategoryComfirm(val.id)" plain>删除</el-button>
                       </div>
                   </h2>
                   <ul>
                       <li v-for=" item in val.children" :key="item.id">{{item.category_name}}
                           <div class="button_group">
                               <el-button size="mini" type="danger">编辑</el-button>
                               <el-button size="mini" plain>删除</el-button>
                           </div>
                       </li>


                   </ul>
               </template>
            </div>
            <div class="main_right">
                <h2>一节分类编辑</h2>
                <div style="height: 20px"></div>
                <el-form :label-position="labelPosition" label-width="100px" :model="formList">
                    <el-form-item label="一级分类名称" v-if="isshow_first_input">
                        <el-input :disabled="first_disabled" v-model="formList.nameOne"></el-input>
                    </el-form-item>
                    <div style="height: 20px"></div>
                    <el-form-item label="二级分类名称" v-if="isshow_children_input">
                        <el-input v-model="formList.nameTwo"></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                        style="margin-left: 98px;margin-top: 20px;"
                        size="mini"
                        :disabled="submit_disabled"
                        @click="submit"
                        type="danger">确定
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
  import { AddFristCategory, GetCategory, DeleteCategory, EditCategory, AddChildrenCategory } from "@/api/news";

  export default {
    data() {
      return {
        labelPosition: 'right',
        formList: {
          nameOne: '',
          nameTwo: ''
        },
        submit_Type: "",//提交的类型
        isshow_first_input: true, //第一个input是展示
        isshow_children_input: false, //第二个input是展示
        first_disabled: false,  //第一个是否禁用
        children_disabled: false, //第二个是否禁用
        submit_disabled: true,   //提交按钮是否禁用
        category: {
          item: [],
          current: []
        }
      }
    },
    methods: {
      submit: function () {
        if (this.submit_Type === 'category_first_add') {
          this.addFirstCategory();
        }
        if (this.submit_Type === 'category_first_edit') {
          // editFirstCategory();
            this.editFirstCategory();
        }
        if (this.submit_Type === 'category_children_add') {
          this.addChildrenCategory();

        }
      },
      editFirstCategory(){
            if(this.category.current.length===0){
              this.$message({
                message: '未选择分类！！',
                type: 'error'
              });
              return false;
            }
        let requestData = {
          id: this.category.current.id,
          categoryName: this.formList.nameOne
        };
        EditCategory(requestData).then(response => {
          let responseData = response.data;
          this.$message({
            message: responseData.message,
            type: "success"
          });
          //修改当前值，可以直接将当前值保存起来，通过vue动态修改
          //不需要重复调用接口
          this.category.current.category_name = responseData.data.data.categoryName;
          // 清空输入框
          this.formList.nameOne='';
          this.category.current = [];
        })
      },
      addChildrenCategory(){
        if (!this.formList.nameTwo || this.formList.nameTwo === "") {
          this.$message({
            message: '二级分类名称不能为空',
            type: 'error'
          });
          return false;
        }
        let requestData = {
          categoryName: this.formList.nameTwo,
          parentId: this.category.current.id
        };
        AddChildrenCategory(requestData).then((res)=>{
          this.$message({message: res.data.data.message, type: 'success'});
          this.$store.dispatch("commom/getInfoCategoryAll").then((res)=>{
            this.category.item=res;
            console.log(this.category.item);
          }).catch((error)=>{

          });
          this.formList.nameTwo='';
        }).catch((error)=>{

        });


      },
      addFirstCategory() {
        if (!this.formList.nameOne || this.formList.nameOne === "") {
          this.$message({
            message: '分类名称不能为空',
            type: 'error'
          });
          return false;
        }

        AddFristCategory({categoryName: this.formList.nameOne}).then((res) => {
          let data = res.data;
          this.category.item.push(data.data);
          this.$message({message: data.message, type: 'success'});
          this.ruleForm.nameOne="";
          this.ruleForm.nameTwo="";
        }).catch((error) => {
          // this.ruleForm.nameOne='';
          // this.ruleForm.nameTwo='';
        })

      },
      addFirst: function (type) {
        this.submit_Type = type;
        this.isshow_first_input = true;
        this.isshow_children_input = false;
        this.submit_disabled = false;
      }, //添加父类
      handlerAddChildren:function (params) {
        this.submit_Type=params.type;
        this.category.current = params.data;
        this.isshow_first_input=true;
        this.first_disabled=true;
        this.isshow_children_input=true;
        this.children_disabled=false;
        this.submit_disabled=false;
      },//添加子类
      editCategory:function (params) {
        this.submit_Type=params.type;
        this.isshow_first_input=true;
        this.first_disabled=false;
        this.isshow_children_input=false;
        this.submit_disabled=false;
        this.formList.nameOne=params.data.category_name;
        this.category.current=params.data
      },
      deleteCategoryComfirm(id){
        this.$untils.messageBox(
          {
            succcessFun:this.deleteCategory,
            errorFun:this.deleteId,
            id:id
          }
        );
      },
      deleteCategory(id){
        DeleteCategory({ categoryId: id }).then(response => {
          this.$store.dispatch("commom/getInfoCategoryAll").then((res)=>{
            this.category.item=res;
          }).catch((error)=>{

          })
        }).catch(error=>{
          console.log(error)
        })
      },
      deleteId(){

      }
    },
    mounted() {
      this.$store.dispatch("commom/getInfoCategoryAll").then((res)=>{this.category.item=res;}).catch((error)=>{})
    }

  }
</script>
<style lang="scss" scoped>
    #info {
        .header {
            margin-bottom: 30px
        }

        .main {
            li, h2 {
                &:hover {
                    background-color: #f3f3f3;

                    .button_group {
                        display: block;
                    }
                }
            }

            h2 {
                background-color: #f3f3f3;
                font-size: 14px;
                line-height: 40px;
                color: #344a5f;
                position: relative;
            }

            display: flex;

            .main_left {
                width: 33%;
                position: relative;

                /*&:before {*/
                /*    content: '';*/
                /*    position: absolute;*/
                /*    left: 20px;*/
                /*    top: 58px;*/
                /*    bottom: 0;*/
                /*    width: 32px;*/
                /*    border-left: 1px dotted #000;*/
                /*}*/

                .button_group {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: none;
                }

                li {
                    margin-top: 12px;
                    position: relative;
                    padding-left: 36px;
                    margin-left: 24px;
                    height: 32px;

                    &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 10px;
                        width: 32px;
                        border-bottom: 1px dotted #000;
                    }
                }
            }

            .main_right {
                margin-left: 40px
            }
        }
    }
</style>