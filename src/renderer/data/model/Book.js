import Sequelize from "sequelize";
import seq from "../config"

const Book = seq.define('books',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(100),           // 标题
    content: Sequelize.STRING(500),         // 详细内容
    ISBN:Sequelize.STRING(20),              // ISBN
    author:Sequelize.STRING(100),            // 作者
    pages: Sequelize.INTEGER(5),                     // 页数
    publishTime:Sequelize.STRING(8),            // 出版时间
    press:Sequelize.STRING(100),               // 出版社
    rate:Sequelize.DOUBLE,                  // 评分
    price:Sequelize.DOUBLE,                       // 售价
    stock: Sequelize.INTEGER(5),                     // 库存
    status:Sequelize.INTEGER(1)                     // 状态： 1 ==》审核、0 ==》下架、2==》上架
},{
    timestamps: false               // 不要默认时间戳
});

Book.sync()

export default Book
