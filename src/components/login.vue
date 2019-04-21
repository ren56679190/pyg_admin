<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png" alt>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-icon_dmail" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-mima" type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary" @click="login()">登录</el-button>
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
        username: 'admin',
        password: '123456'
      },
      rules: {    
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在6-16位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.post("login", this.form).then(res => {
            // console.log(res)
            if(res.data.meta.status == 400){
              this.$message.error(res.data.meta.msg)
            }
            if(res.data.meta.status == 200){
              this.$message.success(res.data.meta.msg)
              //保存token信息
              sessionStorage.setItem('token',res.data.data.token)
              this.$router.push('/home')
            }
          });
        }
      });
    }
  }
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
  background: linear-gradient(45deg, #02d9ff, #029ef8);
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
