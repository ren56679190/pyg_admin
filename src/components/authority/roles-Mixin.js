export default {
  name: 'authority',
  data () {
    return {
      tableData: [],
      // 添加角色部分数据
      dialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色校验
      addrules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ]
      },
      // 编辑角色部分数据
      editFormVisible: false,
      editForm: {},
      // 表单验证
      editrules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ]
      },
      // 分配权限部分数据
      rightdialogVisible: false,
      // 树状控件数据
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的节点数组
      treeListchcked: [],
      rightRoleId: ''
    }
  },
  methods: {
    async getDate () {
      const {data: {data, meta}} = await this.$axios.get(`roles`)
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      // console.log(data)
      this.tableData = data
    },
    // 添加角色部分
    showdialogFormVisible () {
      this.dialogFormVisible = true
      // 清空表单数据
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加角色
    addRoles () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$axios.post('roles', this.addForm)
          // console.log(data, meta)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          this.dialogFormVisible = false
          // 添加成功 重新获取数据
          this.getDate()
        }
      })
    },
    // 删除角色
    delRoles (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$axios.delete(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除角色失败')
        this.$message.success('删除角色成功')
        // 删除成功  重新获取数据
        this.getDate()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑角色  显示对话框  并渲染数据
    showeditFormVisible (id) {
      this.editFormVisible = true
      // 填充默认数据
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {data: {data, meta}} = await this.$axios.get(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除角色失败')
        this.editForm = data
        // console.log(data)
      })
    },
    // 编辑数据  提交请求
    async editRoles () {
      const {data: {meta}} = await this.$axios.put(`roles/${this.editForm.roleId}`, {
        roleName: this.editForm.roleName,
        roleDesc: this.editForm.roleDesc
      })
      if (meta.status !== 200) return this.$message.error('编辑角色失败')
      this.$message.success('编辑角色成功')
      this.getDate()
      this.editFormVisible = false
      // console.log(data, meta)
    },
    // 点击tag标签  删除权限
    delRights (row, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // console.log(row.id, rightId)
        const {data: {data, meta}} = await this.$axios.delete(`roles/${row.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除权限失败')
        this.$message.success('删除权限成功')
        // 删除成功  重新获取数据
        data.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
        row.child = data
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分配权限部分
    async showrightdialogVisible (row) {
      this.rightdialogVisible = true
      // 获取所有权限列表
      const {data: {data, meta}} = await this.$axios.get('rights/tree')
      if (meta.status !== 200) return this.$message.error('获取权限失败')
      this.treeList = data
      // console.log(data)
      // 默认选中
      const arr = []
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      console.log(arr)
      this.treeListchcked = arr
      this.rightRoleId = row.id
    },
    // 分配权限
    async rightSubmit () {
      // 合并选中与半选中
      const treeDom = this.$refs.tree
      const checkedArr = treeDom.getCheckedKeys()
      const halfCheckArr = treeDom.getHalfCheckedKeys()
      const arr = [...checkedArr, ...halfCheckArr]
      // 发送请求
      const {data: {meta}} = await this.$axios.post(`roles/${this.rightRoleId}/rights`, {
        rids: arr.join(',')
      })
      // console.log(this.rightRoleId)
      if (meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.rightdialogVisible = false
      this.getDate()
    }
  },
  mounted () {
    this.getDate()
  }
}
