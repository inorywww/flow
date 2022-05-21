<template>
  <div id="diagrams">
    <div class="title">我的文件</div>
    <GraphList 
    :graphsList="graphsList"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.0)"
    style="min-height: 100px"
    ></GraphList>
  </div>
</template>

<script>
import { getGraphs, delAll } from '../../api/index'
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
      getGraphs().then(res => {
        console.log(res.data);
        if (res.status == 200) {
          this.graphsList = res.data
          this.loading = false
        }
      })
    },
    delAll () {
      delAll().then(res => {
        console.log(res.data);
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