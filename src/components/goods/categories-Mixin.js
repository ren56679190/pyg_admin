export default {
  name: 'Categories',
  data () {
    return {
      // 列表数据相关
      reqParams: {
        pagenum: 1,
        pagesize: 5
      },
      categories: [],
      total: 0,
      // 添加分类部分数据
      addFormVisible: false,
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      // 级联部分数据
      CategoryList: [],
      categoryValues: [],
      // 表单校验规则
      addRules: {
        cat_name: [
          {required: true, message: '分类名称必填', trigger: 'blur'}
        ]
      },
      // 编辑分类部分数据
      editFormVisible: false,
      editForm: {},
      editRules: {
        cat_name: [
          {required: true, message: '分类名称必填', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      const {data: {data, meta}} = await this.$axios.get('categories', {
        params: this.reqParams
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categories = data.result
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },
    // 显示添加分类对话框
    async showaddFormVisible () {
      this.categoryValues = []
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
      this.addFormVisible = true
      // 获取数据
      const {data: {data, meta}} = await this.$axios.get('categories', {
        params: {type: 2}
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      // console.log(data)
      this.CategoryList = data
    },
    async addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const len = this.categoryValues.length
          if (len) {
            this.addForm.cat_pid = this.categoryValues[len - 1]
          }
          else {
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
          const {data: {meta}} = await this.$axios.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.getData()
          this.addFormVisible = false
        }
      })
    },
    // 删除
    delCategory (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: {meta}
          } = await this.$axios.delete(`categories/${id}`)
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
    // 显示编辑对话框
    showeditFormVisible (id) {
      this.editFormVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {data: {data, meta}} = await this.$axios.get(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('获取分类失败')
        this.editForm = data
      })
    },
    // 编辑分类 发送请求
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$axios.put(`categories/${this.editForm.cat_id}`, {
            cat_name: this.editForm.cat_name
          })
          if (meta.status !== 200) return this.$message.error('编辑分类失败')
          this.$message.success('编辑分类成功')
          this.getData()
          this.editFormVisible = false
        }
      })
    }
  }
}

