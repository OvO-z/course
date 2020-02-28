<template>
    <div class="app-main">
        <el-container>
            <el-row type="flex" class="operator" justify="space-between">
                <el-col :span="4"></el-col>
                <el-col :span="10"> <el-input
                        placeholder="请输入导出路径"
                        v-model="folder">
                    <i slot="prefix" class="el-input__icon el-icon-folder"></i>
                </el-input></el-col>
                <el-col :span="8">
                    <el-button type="primary" size="medium" icon="el-icon-document" @click="clickWord()">Word</el-button>
                    <el-button type="success" size="medium" icon="el-icon-document" @click="clickExcel()">Excel</el-button>
                </el-col>
            </el-row>
        </el-container>
        <div class="table-container">
            <el-table ref="bookTable"
                      :data="list"
                      style="width: 100%"
                      v-loading="listLoading"
                      border>
<!--                <el-table-column label="ID" width="90px" prop="id"></el-table-column>-->
                <el-table-column label="编号" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="图书名称" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="ISBN号" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.ISBN}}</template>
                </el-table-column>
                <el-table-column label="作者" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.author}}</template>
                </el-table-column>
                <el-table-column label="售价" width="100" align="center">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column label="出版时间" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.publishTime}}</template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container margin-right">
            <el-pagination
                    background
                    :current-page="pages.currentPage"
                    layout="total, sizes,prev, pager, next,jumper"
                    @current-change="handleCurrentChange"
                    :page-size="pages.limit"
                    :page-sizes="[5]"
                    :total="pages.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Book from "../../data/model/Book";
    import {exportToWord} from "../../office/word/word";
    import {exportToExcel} from "../../office/excel/excel";

    export default {
        name: "index",
        data() {
            return {
                folder:null,
                listLoading: false,
                list:null,
                pages: {
                    limit: 5,
                    currentPage: 1,
                    total: 0
                },
            }
        },
        methods: {
            async getBookInfo(pages){
                let offset = (pages.currentPage - 1) * pages.limit
                let books = await Book.findAndCountAll({
                    offset,
                    raw:true,
                    limit:pages.limit
                })
                return books
            },
            getList() {
                this.listLoading = true;
                this.getBookInfo(this.pages).then(books => {
                    this.listLoading = false
                    this.pages.total = books.count
                    this.list = books.rows
                });
            },
            clickWord(){
                this.getAllList().then(books => {
                    exportToWord(books,"C:\\Users\\24367\\Desktop\\测试\\")
                })

            },
            clickExcel(){
                this.getAllList().then(books =>{
                    exportToExcel(books,"C:\\Users\\24367\\Desktop\\测试\\")
                })

            },
            async getAllList(){
                let books = Book.findAll({raw:true})
                console.error(books)
                 return books
            },
            handleCurrentChange(val) {
                this.pages.currentPage = val;
                this.getList();
            },
        },
        created() {
            this.getList()
        }
    }
</script>

<style scoped>
    .margin-right{
        margin-right: 20px;
    }
    .margin-left{
        margin-left: 20px;
    }
    .operator{
        width: 100%;
    }
</style>
