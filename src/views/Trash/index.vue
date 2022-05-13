<template>
  <div id="diagrams">
    <div class="title">最近删除</div>
    <GraphList :graphsList="graphsList" :is_trash="true"></GraphList>
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
      getGraphs(2).then(res => {
        if (res.status == 200) {
          this.graphsList = res.data
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