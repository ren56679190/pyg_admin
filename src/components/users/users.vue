<template>
  <div class="users_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入搜索关键字" v-model="reqParams.query">
            <el-button slot="append" @click="seach()" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <!-- 优化  打开弹出框  清除表单数据与验证信息 -->
          <el-button type="primary" @click="showForm()" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 添加角色弹出框 -->
      <el-dialog width="400px" title="添加新用户" :visible.sync="dialogFormVisible">
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="roules"
          autocomplete="off"
          label-width="80px"
        >
          <el-form-item label="新用户" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格渲染 -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="updateState(scope.row.id,scope.row.mg_state)"
              active-color="#13ce66"
              inactive-color="#ccc"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="showEditForm(scope.row.id)" round></el-button>
              <el-button icon="el-icon-delete" @click="deluser(scope.row.id)" round></el-button>
              <el-button icon="el-icon-setting" @click="showRole(scope.row)" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.pagesize"
        :total="total"
        @current-change="changePag"
      ></el-pagination>
    </el-card>
    <!-- 修改用户弹出框 -->
    <el-dialog width="400px" title="修改用户" :visible.sync="EditFormVisible">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="editroules"
        autocomplete="off"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹出框 -->
    <el-dialog width="400px" title="分配角色" :visible.sync="roleFormVisible">
      <el-form autocomplete="off" label-width="100px">
        <el-form-item label="当前用户: ">{{roleUserName}}</el-form-item>
        <el-form-item label="当前角色: ">{{roleUserRoleName}}</el-form-item>
        <el-form-item label="分配角色：">
          <el-select v-model="rolevalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './User-Mixin.js'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
</style>
