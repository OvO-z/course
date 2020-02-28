import Sequelize from "sequelize";

const config = {
    dbname: 'course',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
};

const sequelize  = new Sequelize(config.dbname,config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
})

export default sequelize
