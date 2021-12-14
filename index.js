const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const auth = require("./middleware/jwt_verify");

const app = express();
app.use(express.json());

const cx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Iron666##",
    database: "fiapdb",
    port: "3306"
});

cx.connect((error, data) => {
    if(error){
        console.error(`Connection server is fail -> ${error}`);
        return;
    }
    console.log(`Connection information -> ${cx.threadId}`);
});

app.post("/api/client/add", auth,(req, res) => {
    cx.query("insert into tbcliente set ?", req.body,(error, results, fields) => {
        if(error){
            res.status(400)
            .send({output: `Não foi possivel cadastrar cliente ${error}`});
            return;
        }
        res.status(200).send({output: `Cliente cadastrado`, payload: results});
    });
});

app.put("/api/cliente/update/:id", auth, (req, res) => {
    cx.query(
        "update tbcliente set ? where id_cliente=?",
        [req.body, req.params.id],
        (error, result) => {
            if(error){
                res.status(400)
                .send({output: `Não foi possivel atualizar os dados ${error}`});
                return;
            }
            res.status(200).send({output: result});
        }
    );
});

app.listen(5532, () => console.log("Servidor online na porta 5532")); 