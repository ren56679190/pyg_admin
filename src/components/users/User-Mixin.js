export default {
  data () {
    // 定义手机号校验函数
    const checkMobile = (rule, value, callback) => {
      // rule 校验规则信息  value 验证的输入框的值 callback 回调函数
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      userList: [],
      // 传参
      reqParams: {
        query: '',
        // 当前页
        pagenum: 1,
        // 每页显示条数
        pagesize: 5
      },
      // 总页数
      total: 0,
      // 添加用户弹出框是否隐藏
      dialogFormVisible: false,
      roleFormVisible: false,
      EditFormVisible: false,
      // 添加用户
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单验证
      roules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '密码长度在6-16个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 分配角色下拉框数据
      // 选中角色的值
      rolevalue: '',
      // 角色名
      roleUserRoleName: '',
      // 用户名
      roleUserName: '',
      roleUserId: '',
      options: [],
      // 修改用户
      editForm: {},
      editroules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]}
    }
  },
  methods: {
    // 获取数据
    async getData () {
      const {
        data: {data, meta}
      } = await this.$axios.get('users', {params: this.reqParams})
      //   console.log(data, meta);
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.userList = data.users
      this.total = data.total
      // console.log(this.total);
    },
    // 页数改变的时候 获取当前页码   重新查询数据
    changePag (val) {
      console.log(val)
      this.reqParams.pagenum = val
      // 获取数据
      this.getData()
    },
    // 搜索功能 当前页跳转到第一页 重新获取数据
    seach () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    // 添加用户
    addUser () {
      // 请求点击提交 验证表单数据
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {
            data: {meta}
          } = await this.$axios.post('users', this.addForm)
          //   console.log(meta);
          if (meta.status !== 201) return this.$message.error('添加管理员失败')
          // 添加成功后
          this.dialogFormVisible = false
          this.$message.success('添加管理员成功')
          // 更新列表
          this.getData()
        }
      })
    },
    // 优化   显示弹出框 清除验证信息
    showForm () {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 删除用户
    deluser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: {meta}
          } = await this.$axios.delete(`users/${id}`)
          if (meta.status !== 200) return this.$message.error('删除管理员失败')
          this.$message.success('删除管理员成功')
          // 重新获取数据  渲染列表
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改用户状态
    async updateState (id, newState) {
      const {
        data: {meta}
      } = await this.$axios.put(`users/${id}/state/${newState}`)
      // console.log(meta)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      // 重新获取数据
      this.getData()
    },
    // 显示角色下拉框数据
    async showRole (row) {
      this.roleFormVisible = true
      const {
        data: {data, meta}
      } = await this.$axios.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
      // console.log(row);
    },
    // 改变角色
    async changeRole () {
      const {
        data: { meta }
      } = await this.$axios.put(`users/${this.roleUserId}/role`, {
        rid: this.rolevalue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleFormVisible = false
      // 重新获取数据
      this.getData()
    },
    // 修改用户部分
    async showEditForm (id) {
      this.EditFormVisible = true
      // 根据id获取数据
      const {data: {data, meta}} = await this.$axios.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      // console.log(data)
      this.editForm = data
    },
    editUser () {
      // 表单验证
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$axios.put(`users/${this.editForm.id}`,{
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改用户失败')
          this.$message.success('修改用户成功')
          this.getData()
          this.EditFormVisible = false
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
