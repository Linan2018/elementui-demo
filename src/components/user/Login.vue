<template>
    <div class="login-wrap">

        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <div class="ms-title">欢迎</div>
                <el-form-item prop="username" lable="用户名">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" lable="密码">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button type="primary" @click="dialogVisible = true">注册</el-button>
                </div>
            </el-form>
        </div>
         <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
           <el-form :rules="rules2" ref="reg" :model="reg" label-width="80px" >
             <el-form-item label="用户名" prop="username">
               <el-input v-model="reg.username" placeholder="请输入用户名"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="reg.password" placeholder="请输入密码"></el-input>
             </el-form-item>
             <el-form-item label="邮箱" prop="email">
               <el-input type="email" v-model="reg.email" placeholder="请输入邮箱"></el-input>
             </el-form-item>
             <el-form-item label="昵称" prop="nickname">
               <el-input v-model="reg.nickname" placeholder="请输入昵称"></el-input>
             </el-form-item>
           </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitReg('reg')">确 定</el-button>
           </span>
         </el-dialog>
    </div>
</template>

<script>
    // import {login} from '../../api'
    import {checkuser} from '../../api'
    import {register} from '../../api'

    export default {
        data: function(){
            return {
                dialogVisible:false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                reg: {
                    username: '',
                    password: '',
                    email: '',
                    nickname: ''
                },
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码不能为空', trigger: 'blur' }
                    ]
                },
                rules2: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: false, message: '请输入邮箱', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: false, message: '请输入昵称', trigger: 'blur' }
                    ],
                },
                meuns: [
                    {
                        "icon": "el-icon-setting",
                        "index": "/home",
                        "title": "首页",
                        "subs": null
                    },
                    {
                        "icon": "el-icon-menu",
                        "index": "2",
                        "title": "用户管理",
                        "subs": [
                            {
                                "icon": null,
                                "index": "/users",
                                "title": "用户列表",
                                "subs": null
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            submitForm(formName) {
				    console.log(sessionStorage);
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('qs');
                        var params = qs.stringify({
                            username: self.ruleForm.username,
                            password: self.ruleForm.password,
                            blogId: -1
                        });
                        console.log(params);
                        checkuser(params).then(result => {
                            console.log("11");
                            if (result.message == '登陆成功') {
                                sessionStorage.setItem('login_username',self.ruleForm.username);
                                sessionStorage.setItem('token',self.token);
                                sessionStorage.setItem('meuns',qs.stringify(self.meuns));
                                sessionStorage.setItem('routers',"/home_/users");
                                self.$router.push('/home');
                            } else {
                                self.$message.error(result.message);
                            }
                        }).catch(function (error) {
                            console.log("22");
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitReg(formName){
            console.log("call submitReg");
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('qs');
                        var params = qs.stringify({
                            username: self.reg.username,
                            password: self.reg.password,
                            email: self.reg.email,
                            nickname: self.reg.nickname,
                            avator: ''
                        });
                        console.log(params);
                        self.reg.username='';
                        self.reg.password='';
                        self.reg.email='';
                        self.reg.nickname='';
                        self.dialogVisible=false;
                        register(params).then(result => {

                            console.log("11");
                            if (result.message == '注册成功') {
                              console.log("注册成功");
                              self.$message({
                                        message: '注册成功',
                                        type: 'success'
                                      });
                            } else {
                              console.log(result.message);

                                self.$message.error(result.message);
                            }
                        }).catch(function (error) {
                            console.log("22");
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{

        width:100%;
        height:40%;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .ms-title{
        margin: -30px auto 40px auto;
        text-align: center;
        font-size:30px;
        color: #505458;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:30%;
        height:36px;
    }
</style>


<!--
{
    "status": true,
    "code": 200,
    "message": null,
    "data": {
        "meuns": [
            {
                "icon": "el-icon-setting",
                "index": "/home",
                "title": "首页",
                "subs": null
            },
            {
                "icon": "el-icon-menu",
                "index": "2",
                "title": "用户管理",
                "subs": [
                    {
                        "icon": null,
                        "index": "/users",
                        "title": "用户列表",
                        "subs": null
                    }
                ]
            }
        ],
        "routers": "/home_/users",
        "token": "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNTkxMTY0NDkyfQ.IelMVjdw4Lxt-mCgwaY27-rv2JR80NsKHDgY5CDRRU3TCNDnlKdr5gu6Zb88AiwlzMFEtx3b_ePHg6Ip0KsBX2Z2nIKWAThX-bgm6OvjuaC-NqibShE99NXA2z8SydbRfAxegziB92YETS2cPvz1NNqqpZxTns05hs-j0D_tac4"
    }
} -->
