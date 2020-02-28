<template>
    <div class="app-main">
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <app-main/>
        </div>
    </div>
</template>

<script>

    import {AppMain, Navbar, Sidebar} from "./components";

    export default {
        name: "index",
        components:{
            Navbar,
            Sidebar,
            AppMain
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/index.scss";
</style>
