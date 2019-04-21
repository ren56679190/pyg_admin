<template>
  <el-container class="home_content">
    <el-header class="home_header">
      <el-button
        type="info"
        size="mini"
        icon="iconfont icon-icon--"
        circle
        @click="toggleMenu()"
      ></el-button>
      <span>品优购后台管理系统</span>
      <el-button class="quit" size="mini" type="danger" @click="quite()" round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse?'65px':'180px'" class="home_aside">
        <el-menu
          :collapse-transition="false"
          :collapse="collapse"
          style="border: none;padding-top: 5px"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
        >
          <el-submenu index="item.id" v-for="(item,i) in menus" :key="item.id">
            <template slot="title">
              <i :class='["iconfont" ,iocArray[i]]'></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item index="item.id" v-for="item1 in item.children" :key="item1.id">
              <i class="iconfont icon-icon_work_fill"></i>
              <span>{{item1.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      menus: [],
      iocArray: ['icon-1USER','icon-icon_namecard','icon-icon_yingyongguanli'
,'icon-icon_doc','icon-tongji1']
    };
  },
  methods: {
    toggleMenu() {
      this.collapse = !this.collapse;
    },
    getData() {
      this.$axios.get("menus").then(res => {
        // console.log(res.data.data);
        // this.menus = res.data.data;
        // this.menuschildren = res.data.data.children
        console.log(res.data.data)
        const { data, meta } = res.data;
        if (meta.status !== 200) return this.$message.error(meta.message);
        this.menus = data;
      });
    },
    quite(){
      //退出
      sessionStorage.removeItem('token'),
      this.$router.push('/login')
      this.$message.success('退出成功')
    }
  },
   mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.home_content {
  height: 100%;
}

.home_header {
  background: #373d41;
  line-height: 60px;
}

.home_header span {
  font-size: 18px;
  color: #eee;
  margin-left: 15px;
}

.quit {
  float: right;
  margin-top: 15px;
}

.home_aside {
  background: #333744;
  overflow: hidden;
}

.home_main {
  background: #eaedf1;
}

.iconfont {
  margin-right: 5px;
}
</style>
