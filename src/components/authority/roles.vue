<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="showdialogFormVisible()">添加角色</el-button>
      <!--表格-->
      <template>
        <el-table
          :data="tableData"
          height="400"
          style="width: 100%">
          <el-table-column type="expand">
            <!-- 展开项 -->
            <template slot-scope="scope">
              <!-- 一级权限 -->
              <el-row v-for="(item,i) in scope.row.child"
                      :key="item.id"
                      style="border-bottom: 1px solid #eee"
                      :style="{'border-top':i===0?'1px solid #eee':'none'}"
              >
                <el-col :span="4">
                  <el-tag closable @close="delRights(scope.row,item.id)">{{item.authName}}</el-tag>
                  <span class="el-icon-caret-right"></span>
                </el-col>
                <el-col :span="20">
                  <!--二级权限-->
                  <el-row v-for="(twoitem,i) in item.child"
                          :key="twoitem.id"
                          :style="{'border-top':i===0?'none':'1px solid #eee'}"
                  >
                    <el-col :span="8">
                      <el-tag closable type="success" @close="delRights(scope.row,twoitem.id)">{{twoitem.authName}}</el-tag>
                      <span class="el-icon-caret-right"></span>
                    </el-col>
                    <el-col :span="16">
                      <!--三级权限-->
                      <el-tag closable type="warning"
                              v-for="threeitem in twoitem.child"
                              @close="delRights(scope.row,threeitem.id)"
                              :key="threeitem.id">
                        {{threeitem.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            property="roleDesc"
            label="角色描述">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-edit" round @click="showeditFormVisible(scope.row.id)"></el-button>
                <el-button icon="el-icon-delete" round @click="delRoles(scope.row.id)"></el-button>
                <el-button icon="el-icon-setting" round @click="showrightdialogVisible(scope.row)"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" width="400px" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" autocomplete="off" label-width="100px" :rules="addrules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="添加角色" width="400px" :visible.sync="editFormVisible">
      <el-form ref="editForm" :model="editForm" autocomplete="off" label-width="100px" :rules="editrules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="rightdialogVisible"
      width="400px">
      <!-- 权限列表树 -->
      <el-tree
        :data="treeList"
        :default-expand-all= "true"
        show-checkbox
        ref="tree"
        node-key="id"
        :default-checked-keys="treeListchcked"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
    <el-button @click="rightdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rightSubmit()">确 定</el-button>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './roles-Mixin'

export default {
  mixins: [mixin]
}
</script>

<style scoped>
  .el-tag {
    margin: 5px;
  }

  .el-row {
    display: flex;
    align-items: center;
  }
</style>
