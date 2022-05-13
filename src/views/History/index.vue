<template>
  <div id="history">
    <div class="title">最近修改</div>
    <GraphList :graphsList="graphsList"></GraphList>
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
    }
  },
  mounted () {
    this.getAllGraphs()
  },
  methods: {
    getAllGraphs () {
      getGraphs(1).then(res => {
        if (res.status == 200) {
          this.graphsList = res.data
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
#history {
  flex: 1;
  width: 0;
}
</style>