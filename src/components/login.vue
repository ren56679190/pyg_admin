<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png" alt>
      <el-form :model="form" >
        <el-form-item >
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: linear-gradient(30deg, #ebf4fb, #115763);
}
.login_container .box {
  width: 400px;
  height: 250px;
  background: linear-gradient(45deg, #d2ecf1, #efefef);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -60%);
  box-shadow: 0 0 10px #eee;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
}
.login_container .box img {
  margin: 0px 100px 15px 100px;
}
</style>
