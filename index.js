const express = require("express");
const app = express();
//const Mysql = require("mysql");
const Cors = require("cors");
const PORT =  process.env.PORT || 3001;
app.use(Cors());  // usando o cors para evirar erros no fron-end
app.use(express.json())  // aqui estou usando o express no formato de Json
/*
const DB =  Mysql.createConnection({
    host: "loc", 
    user: "root",
    password: "password",
    database: "mateusdata",
    
})*/
var mysql = require('mysql2');
var DB = mysql.createConnection({
  host: "us-east.connect.psdb.cloud",
  user: "z4y7h4utvsjbmkad20g0",
  password: "pscale_pw_VuayTH0LDFMaESf1CedsFHWzjUgGMKATivbDFBdkOQw",
  database: "mateusdata",
  ssl: {
    rejectUnauthorized: true
  }
});


DB.connect(function(err) {
    if (err) throw err;
    console.log("Succesfully connected to PlanetScale!");
   //process.exit(0)
  });

console.log(DB);

app.delete("/apagarbanco", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );
    let sql ="DROP TABLE `mateusdata`.`usuarios`";
    DB.query(sql, (err, result) =>{
        if(err){console.log(err); return;}
        console.log("tabela excluida")
    });
})

app.delete("/criartabela", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );
    let sql = "CREATE TABLE `mateusdata`.`usuarios` ( `id` INT NOT NULL AUTO_INCREMENT, `nome` VARCHAR(45) NOT NULL, `email` VARCHAR(45) NOT NULL, `senha` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`));"
    DB.query(sql, (err, result) => {
        if(err){console.log(err); return;}
        console.log("Tabela criada");
    })
})
app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );

    let sql  = "SELECT * FROM usuarios";
    DB.query(sql, (err, result) => {
        if(err){console.log(err); return;};
        res.send(result)
        console.log(result);
    })
   

   

})
app.put("/recebendo", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );
    console.log(req.body);

    const {nome} = req.body;
    const {email}  = req.body;
    const {senha} = req.body;
    let sql = ("INSERT INTO usuarios(nome, email, senha) VALUES (?,?,?)") // sql recebe um comando sql
    DB.query(sql,[nome, email, senha] ,(err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Arquivos adicionados no banco de dados: mateusdata");
    })
})

app.listen(PORT, () => {
    
    console.log("Iniciando servidor");
})
