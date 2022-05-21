<template>
  <div id="menu-bar">
    <div class="menu" @mouseleave="show_sub_key = ''">
      <div class="item" v-for="menu in menu_list" :key="menu.desc">
        <!-- {{menu.desc}} -->
        <el-dropdown @command="select" trigger="click" placement="bottom">
          <div class="el-dropdown-link btn">
            {{menu.desc}}
            
          </div>
          <el-dropdown-menu slot="dropdown" v-if="menu.sub_list && menu.sub_list.length > 0">
            <el-dropdown-item :command="item.key" v-for="item in menu.sub_list" :key="item.desc">
              <div class="inner" @mouseenter="show_sub_key = item.key">
                <span>{{item.desc}}</span>
                <svg v-if="item.sub_list && item.sub_list.length > 0" t="1653111761916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11815" width="12" height="12"><path d="M734.414 534.103l-417.63 383.252c-12.207 11.203-31.185 10.388-42.387-1.82a30 30 0 0 1-7.897-20.283V128.748c0-16.568 13.431-30 30-30a30 30 0 0 1 20.284 7.897l417.63 383.252c12.207 11.202 13.022 30.18 1.82 42.387a30 30 0 0 1-1.82 1.82z" fill="#333333" p-id="11816"></path></svg>
              </div>
              <div @mouseleave="show_sub_key = ''" class="sub-list" v-if="item.sub_list && item.sub_list.length > 0 && show_sub_key === item.key">
                <div class="sub-item" v-for="sub in item.sub_list" :key="sub.desc" @click="subSelect(sub.key)">{{sub.desc}}</div>
              </div>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      is_click: false,
      menu_list: [
        {
          desc: '文件',
          sub_list: [
            {
              desc: '重命名文件',
              key: 'rename'
            },
            {
              desc: '克隆此文件',
              key: 'clone'
            },
            {
              desc: '下载为...',
              key: 'download-sub',
              sub_list: [
                {
                  desc: 'PNG图片文件（*.png）',
                  key: 'png'
                },
                {
                  desc: 'JPN图片文件（*.jpg',
                  key: 'jpg'
                },
                {
                  desc: 'LogicFlow文件（*.lf）',
                  key: 'lf'
                },
                {
                  desc: 'XML文件*.xml',
                  key: 'xml'
                },
              ]
            },
            {
              desc: '打印',
              key: 'print',
            },
            {
              desc: '关闭',
              key: 'close',
            },
          ]
        },
        {
          desc: '编辑',
          sub_list: [
            {
              desc: '撤销',
              key: 'revoke'
            },
            {
              desc: '恢复',
              key: 'recover'
            },
            {
              desc: '剪切',
              key: 'cut'
            },
            {
              desc: '复制',
              key: 'copy'
            },
            {
              desc: '粘贴',
              key: 'paste'
            },
            {
              desc: '全选',
              key: 'selectAll'
            },
            {
              desc: '删除',
              key: 'delete'
            },
          ]
        },
        {
          desc: '视图',
          sub_list: [
            {
              desc: '放大',
              key: 'zoomIn'
            },
            {
              desc: '缩小',
              key: 'zoomOut'
            },
            {
              desc: '25%',
              key: 'zoom25'
            },
            {
              desc: '50%',
              key: 'zoom25'
            },
            {
              desc: '75%',
              key: 'zoom25'
            },
            {
              desc: '100%',
              key: 'zoom25'
            },
            {
              desc: '重置缩放',
              key: 'resetZoom'
            },
          ]
        },
        {
          desc: '页面',
          sub_list: [
            {
              key: ''
            }
          ]
        }
      ],
      show_sub_key: ''
    }
  },
  methods: {
    select (key) {
      if (!key.includes('-sub')) {
        console.log(key);
      }
    },
    subSelect (key) {
      console.log(key);
    },
    mouse (key) {
      this.show_sub_key = key
      console.log(key);
    },
    change (val) {
      if (val && !this.is_click) {
        this.is_click = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
#menu-bar {
  padding: 0 40px 8px;
  border-bottom: 1px solid #e5e5e5;
  .menu {
    display: flex;
    align-items: center;
    .item {
      margin-right: 20px;
    }
  }
}
.sub-list {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #e5e5e5;
  .sub-item {
    line-height: 36px;
    padding: 0 16px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    outline: 0;
    white-space: nowrap;
    background-color: #FFF;
    &:hover {
      background-color: #eee;
    }
  }
}
.el-dropdown-menu {
  width: 160px;
}
.el-dropdown-menu__item {
  position: relative;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>