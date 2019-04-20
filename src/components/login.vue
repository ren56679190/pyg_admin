<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>
.login_container{
  width: 100%;
  height: 100%;
  background: linear-gradient(30deg,#EBF4FB,#115763)
}
.login_container .box {
  width: 400px;
  height: 250px;
  background:linear-gradient(45deg,#D2ECF1,#efefef);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-60%);
  box-shadow: 0 0 10px #eee;
}
.login_container .box img{
  margin:15px 115px 0 115px;
}
</style>
