<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="icon">
      <svg t="1578622727716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1139" width="128" height="128"><path d="M395.585 378.9136667l4.521 262.217-27.126-29.387-24.865 47.47 110.764 119.806 2.26-366.198z" p-id="1140" fill="#ffffff"></path><path d="M246.393 802.472S-24.865 825.077 2.26 526.693c0 0 20.345-162.755 214.747-178.578 0 0 29.386-250.914 280.3-253.175 0 0 244.132 0 275.78 253.175 0 0 205.703 2.26 221.527 226.048 0 0 0 232.83-253.175 228.31V750.48s187.62 11.303 201.184-174.057c0 0-2.261-187.62-214.747-178.579 0 0 2.26-246.392-235.09-250.913 0 0-217.007 0-232.83 250.913 0 0-196.662-13.562-214.746 178.579 0 0-4.521 180.839 201.183 174.057v51.991z" p-id="1141" fill="#ffffff"></path><path d="M603.55 775.20566669l-4.521-259.956 27.126 29.386 24.865-47.47-110.764-119.806-2.26 366.199z" p-id="1142" fill="#ffffff"></path></svg>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
    <div class="close">
      <el-button type="danger" size="mini" @click="close">退出</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
const {BrowserWindow} = require('electron')
export default {
  components: {SidebarItem},
  computed: {
    ...mapGetters([
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return true
    }
  },
  methods: {
    close() {
      this.$confirm('此操作将退出程序, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$electron.ipcRenderer.send('close')
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/index.scss";
  .icon {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      width: 100%;
     .el-button{
       width: 80%;
    }
  }
</style>

