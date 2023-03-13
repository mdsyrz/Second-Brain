const express = require("express");
const articleRouter = require('./routes/articles')
const app = express();

// Set view engine
app.set("view engine", "ejs");

app.use('/articles', articleRouter)

// Route linked to views/index.ejs
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
