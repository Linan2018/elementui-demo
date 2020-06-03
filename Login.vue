<template>
    <div class="login-wrap">

        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <div class="ms-title">后台管理系统</div>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import {login} from '../../api'
    import {checkuser} from '../../api'

    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
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
        width:100%;
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
