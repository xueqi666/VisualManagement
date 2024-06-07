<template>
  <div class="body">
    <el-form
      :rules="rules"
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">欢迎登录</h3>
      <el-form-item prop="username" :error="errText">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="亲，请输入用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :error="errText">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="亲，请输入密码"
        >
        </el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <div style="display: flex">
        <el-button type="primary" style="width: 100%" @click="submitLogin"
          >登录</el-button
        >
        <el-button style="width: 100%" @click="submitRegistry">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/login";
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "",
      loginForm: {
        username: "admin",
        password: "1234567",
      },
      errText: "",
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 14,
            message: "长度在 5 到 14 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          ,
          { min: 6, message: "密码长度要大于6", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitRegistry() {
      this.$router.push({
        path: "/registry",
      });
    },
 submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let { username, password } = this.loginForm;
          login({ username, password }).then((res) => {
            if (res.code === 200 && res.data) {
              this.$message.success("登录成功");
              localStorage.setItem(
                "visual_token",
               res.data
              );
              this.$router.push("/page0");
            } else {
              this.errText = "用户名或密码错误";
            }
          }).catch(err => {
          alert('服务器有问题')
          });
        }
      });
    },
  },
  mounted() {},
  created() {
    let visual_token = localStorage.getItem("visual_token")
    if (this.$route.query.name) { 
       this.loginForm.username = this.$route.query.name || "admin";
      this.loginForm.password = this.$route.query.password || "1234567";
       return
    }
    if (this.checked && visual_token) {
      let user = JSON.parse(atob(visual_token.split('.')[1])) 
         this.loginForm.username = user.username
          this.loginForm.password = user.password
    } 
  },
};
</script>

<style lang="less" scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  text-align: left;
  margin: auto;
  margin-top: 180px;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: aliceblue;
  border: 1px solid blueviolet;
  box-shadow: 0 0 25px #f885ff;
}
.loginTitle {
  margin: 0px auto 25px auto;
  text-align: center;
  font-size: 40px;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.body {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/background.jpg");
  background-size: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>


