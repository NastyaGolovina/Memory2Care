const mysql = require("mysql2/promise");

async function init() {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "yfcnz212006"
    })

    await connection.query("CREATE DATABASE IF NOT EXISTS memory2care")

    console.log("Database created")

    await connection.end()
}

init()