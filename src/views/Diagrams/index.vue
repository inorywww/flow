<template>
  <div id="diagrams">
    <div class="title">我的文件</div>
    <GraphList :graphsList="graphsList"></GraphList>
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
    }
  },
  mounted () {
    this.getAllGraphs()
  },
  methods: {
    getAllGraphs () {
      getGraphs().then(res => {
        console.log(res.data);
        if (res.status == 200) {
          this.graphsList = res.data
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