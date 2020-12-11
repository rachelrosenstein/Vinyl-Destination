require("dotenv").config();

module.exports = {
    "development": {
        "username": "od5kjwksgo7lnoxu",
        "password": "hoh4tsr0tzfr91uz",
        "database": "d4augd1x6u7u8jja",
        "host": "j1r4n2ztuwm0bhh5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": process.env.JAWSDB_URL,
        "dialect": "mysql"
    }
}
