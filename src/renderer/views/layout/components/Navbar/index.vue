<template>
    <div class="header-view" :style="{height: height}">
        <div class="right">
            <el-button @click="minimize" class="no-drag minimize" size="mini" type="text">
                <i class="btn el-icon-minus"></i>
            </el-button>
            <el-button @click="close" class="no-drag close" size="mini" type="text">
                <i class="btn el-icon-close"></i>
            </el-button>
        </div>
    </div>
</template>

<script>
    const {BrowserWindow} = require('electron')
    export default {
        props: {
            height: {
                type: String,
                default: '40px'
            }
        },
        methods: {
            close() {
                this.$confirm('此操作将退出数据传输, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$electron.ipcRenderer.send('close')
                }).catch(() => {

                })
            },
            minimize() {
                this.$electron.ipcRenderer.send('minimize')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/index.scss";
    .header-view {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        width: 100%;
        .right {
            margin-right: 15px;
            .btn {
                font-size: 17px;
                color: #333;
            }
        }
        .close .btn:hover {
            color: $color-danger
        }
        .minimize .btn:hover {
            color: $color-success
        }
    }
</style>
