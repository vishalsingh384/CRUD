import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.password,
    database:"test"
});

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/books",(req,res)=>{
    const q="INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const q="DELETE FROM books WHERE id=?";

    db.query(q,[id], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put("/books/:id",(req,res)=>{
    const {id}=req.params;
    const q="UPDATE books SET `title`=? ,`desc`=? ,`cover`=? ,`price`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q,[...values, id], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8800,(err, res)=>{
    console.log("Server running");
})