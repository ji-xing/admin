<template>
    <div class="login_wap">
        <div class="login">
            <ul class="">
                <li v-for="item in meauTab"
                    @click="changeTitle(item)"
                    :class="{active:item.current}">
                    {{item.txt}}
                </li>
            </ul>
            <div style="height:30px"></div>
            <!--  表单          -->
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm"
                     class="demo-ruleForm ">
                <el-form-item prop="email">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="secondPass" v-if="model==='register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.secondPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="7">
                            <el-button type="success"
                                       @click="getSMs()"
                                       :disabled="updateSendCode.status">
                                {{updateSendCode.messsage}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%;margin-top: 30px;" type="danger" @click="submitForm('ruleForm')">
                        {{model==="登录"?"登录":"注册"}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
  import {getSM,Login} from "../../api/login";
  import {lxd_validateEmail, lxd_validatePass, lxd_validateVCode} from "../../untils/validate";
  import sha1 from 'js-sha1';

  export default {
    data() {
      var validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('验证码'));
        } else if (lxd_validateVCode(value)) {
          callback(new Error('请输入正确验证码格式'));
        } else {
          callback()
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error('邮箱不能为空'));
        } else if (lxd_validateEmail(value)) {
          callback(new Error('请输入正确邮箱格式'));
        } else {
          callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (lxd_validatePass(value)) {
          callback(new Error('密码格式错误'));
        } else {
          callback()
        }
      };
      var validateSecondPass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (lxd_validatePass(value)) {
          callback(new Error('密码格式错误'));
        } else if (this.ruleForm.pass != this.ruleForm.secondPass) {
          callback(new Error('两次密码不一致'));
        } else {
          callback()
        }

      };
      return {
        meauTab: [ //表头数据
          //current切换时判断激活，type判断当前为那个模块，为
          //重复密码和改变字做判断用的
          {txt: "登录", current: true, type: "login"},
          {txt: "注册", current: false, type: "register"}
        ],
        //表单数据
        ruleForm: {
          email: '1165510700@qq.com',
          pass: 'a123456',
          code: '',
          secondPass: ""
        },
        rules: {//校验规则
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          code: [
            {validator: validateCode, trigger: 'blur'}
          ],
          secondPass: [
            {validator: validateSecondPass, trigger: 'blur'}
          ]
        },
        model: "登录",//判断当前为为登录还是注册,切换头部赋值
        updateSendCode: { //改变短信验证码的禁用和验证码中的字
          status: false,
          messsage: "获取验证码"
        },
        timer: null//定时器
      }
    },
    methods: {
      submitForm(formName) { //表单提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let repuestData = {
              username: this.ruleForm.email,
              password: sha1(this.ruleForm.pass),
              code: this.ruleForm.code
            };
            this.$store.dispatch('app/login',repuestData).then((res)=>{
              this.$router.push({name:"Console"})
            }).catch((error)=>{

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(ruleForm) { //表单重置
        this.$nextTick(function() {
          // 打开新增弹窗前先重置表单 避免表单出现上一次新增的校验数据
          this.$refs.ruleForm.resetFields();
        });




      },
      changeTitle(item) {
        //点击切换按钮，改变激活的判断meauTab.current的值
        this.meauTab.forEach(val => val.txt === item.txt ? val.current = true : val.current = false);
        this.model = item.type;
        this.clearTimer(); //清除定时器上的字
        this.resetForm(this.ruleForm) //清除表单
      },
      getSMs() {
        if (this.ruleForm.email === "") {
          this.$message.error('邮箱不能为空');
        } else if (lxd_validateEmail(this.ruleForm.email)) {
          this.$message.error('请输入正确邮箱格式');
        } else {
          let params = {
            username: this.ruleForm.email,
            module: this.model
          };
          this.updateSendCode = {
            status: true,
            messsage: "发送中"
          };
          // console.log(params);
          getSM(params).then((res) => {
            var data = res.data;
            this.$message.error(data.message);
            this.ruleForm.code=data.message.substr(-6.6); //赋值
            this.countDown(60);
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      countDown(number) {
        if (this.timer) {
          this.clearTimer()
        }
        this.timer = setInterval(() => {
          number--;
          if (number === 0) {
            this.clearTimer();
            this.updateSendCode = {
              status: false,
              messsage: "重新获取"
            };
            return;
          }
          this.updateSendCode = {
            status: true,
            messsage: `倒计时${number}秒`
          };
        }, 1000)
      },
      clearTimer() {
        this.updateSendCode = {
          status: false,
          messsage: "获取验证码"
        };
        clearInterval(this.timer)
      }

    },
    created() {
    }
  }
</script>
<style lang="scss" scoped>

    .login_wap {
        background-color: #344a5f;
        height: 100vh;

        .login {
            width: 330px;
            margin: auto;

            ul {
                justify-content: space-evenly;
                display: flex;

                li {
                    width: 88px;
                    line-height: 36px;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 2px;
                    cursor: pointer;
                    text-align: center;
                }
            }

            .el-form {
                label {
                    margin-bottom: 3px;
                    font-size: 14px;
                    color: #fff;
                }
            }

        }
    }

</style>