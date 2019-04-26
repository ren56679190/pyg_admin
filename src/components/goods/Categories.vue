<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="showaddFormVisible()">添加分类</el-button>
      <el-table
        :data="categories"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id">
        <el-table-column
          prop="cat_name"
          label="分类名称">
        </el-table-column>
        <el-table-column
          label="是否有效">
          <template slot-scope="scope">
            <i v-if="!scope.row.cat_deleted" class="el-icon-success" style="color: green"></i>
            <i v-else class="el-icon-error" style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">一级分类</el-tag>
            <el-tag v-if="scope.row.cat_level===1" type="success">二级分类</el-tag>
            <el-tag v-if="scope.row.cat_level===2" type="warning">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="plain" icon="el-icon-edit" round @click="showeditFormVisible(scope.row.cat_id)"></el-button>
              <el-button type="plain" icon="el-icon-delete" round @click="delCategory(scope.row.cat_id)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager_container">
        <el-pagination
          background
          @current-change="changePager"
          :page-size="reqParams.pagesize"
          :current-page="reqParams.pagenum"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <!-- 添加分类对话框 -->
      <el-dialog width="400px" title="添加分类" :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="100px" ref="addForm" :rules="addRules"  autocomplete="off">
          <el-form-item label="活动名称" prop="cat_name">
            <el-input v-model="addForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              expand-trigger="hover"
              :options="CategoryList"
              style="width: 100%"
              el-cascader  :props="{value:'cat_id',label:'cat_name'}"
              v-model="categoryValues">
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑分类对话框 -->
      <el-dialog width="400px" title="添加分类" :visible.sync="editFormVisible">
        <el-form :model="editForm" label-width="100px" ref="editForm" :rules="editRules"  autocomplete="off">
          <el-form-item label="活动名称" prop="cat_name">
            <el-input v-model="editForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import mixin from './categories-Mixin'

  export default {
    mixins: [mixin]
  }
</script>

<style scoped>

</style>
