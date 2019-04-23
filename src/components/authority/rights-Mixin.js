export default {
  name: 'rights',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getDate () {
      const {data: {data, meta}} = await this.$axios.get(`rights/list `)
      // console.log(data, meta)
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      this.tableData = data
    }
  },
  mounted () {
    this.getDate()
  }
}
