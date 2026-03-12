const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smart_campus",
  password: "annie",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Smart Campus Backend Running");
});


app.post("/register", async (req, res) => {

const { name, email, password } = req.body;

try {

const result = await pool.query(
"INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
[name,email,password,"student"]
);

res.json({
success:true,
user:result.rows[0]
});

} catch(error){

console.log(error);
res.status(500).json({error:error.message});

}

});
app.post("/login", async (req, res) => {

const { email, password } = req.body;

try{

const result = await pool.query(
"SELECT * FROM users WHERE email=$1 AND password=$2",
[email,password]
);

if(result.rows.length > 0){

res.json({
success:true,
user:result.rows[0]
});

}else{

res.json({
success:false,
message:"Invalid email or password"
});

}

}catch(error){

console.log(error);
res.status(500).json({error:error.message});

}

});
app.post("/announcement", async (req, res) => {

const { title, message } = req.body;

try{

const result = await pool.query(
"INSERT INTO announcements(title,message) VALUES($1,$2) RETURNING *",
[title,message]
);

res.json({
success:true,
data:result.rows[0]
});

}catch(error){

console.log(error);
res.status(500).json({error:error.message});

}

});
app.get("/announcements", async (req, res) => {

try{

const result = await pool.query(
"SELECT * FROM announcements ORDER BY created_at DESC"
);

res.json(result.rows);

}catch(error){

console.log(error);
res.status(500).json({error:error.message});

}

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});