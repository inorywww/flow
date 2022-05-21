<template>
  <div id="diagrams">
    <div class="title">最近删除</div>
    <GraphList
    :graphsList="graphsList"
    :is_trash="true"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.0)"></GraphList>
  </div>
</template>

<script>
import { getGraphs } from '../../api/index'
import GraphList from '../../components/GraphList.vue'
export default {
  name: 'diagrams',
  components: { GraphList },
  data () {
    return {
      graphsList: [],
      loading: false
    }
  },
  mounted () {
    this.getAllGraphs()
  },
  methods: {
    getAllGraphs () {
      this.loading = true
      getGraphs(2).then(res => {
        if (res.status == 200) {
          this.graphsList = res.data
          this.loading = false
        }
      })
    },
  }

}
</script>

<style lang="less" scoped>
#diagrams {
  flex: 1;
  width: 0;
}
</style>