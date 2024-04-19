<template>
  <div class="body">
    <div class="warper">
      <h1 style="text-align: center">注册</h1>
      <div class="w-1">
        <el-form ref="userForm" :model="user" label-width="80px" :rules="rules">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitRegistry">注册</el-button>
             <el-button @click="$router.push('/')" type="primary">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { registry } from "../api/login";
export default {
  name: "Registry",
  data() {
    return {
      user: {
        name: "",
        password: "",
        phone: "",
        email: "",
      },
      // 创建验证规则
      rules: {
        phone: [
          { required: true, message: "手机号必填", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "用户名必填", trigger: "blur" }],
        password: [ { required: true, message: "密码必填", trigger: "blur" },
          ,
          { min: 6, message: "密码长度要大于6", trigger: "blur" },],
      },
    };
  },
  methods: {
    submitRegistry() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          registry(this.user).then((res) => {
            if (res.code === 200 && res.data) {
              this.$message.success("注册成功");
              this.$router.push("/");
            } else {
              this.$message.error("用户名已存在");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.body {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/50bb6cb5cef84475bd912705b3d5da55 .jpg");
  background-size: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.warper {
  margin: 5% auto;
  width: 300px;
  height: 400px;
  padding: 30px 20px;
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

  & .w-1 {
    margin-top: 20px;
  }
}
</style>