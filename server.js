const express = require('express');
const app = express()
const port = 3000
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const users = [];
app.get('/', (req, res) => {
  res.render('login');
});
app.post('/login',(req,res)=>{
  const { name } = req.body;
  users.push({ name });
  console.log(name);
  res.redirect('/users');
})
app.get('/users',(req,res)=>{
  res.render('index',{users});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})