const express = require("express");
const fs = require("fs");
const path = require("path");
const { cwd } = require("process");
const {marked} = require("marked")
const app = express();
const port = 5000;


app.get("/readme", (req,res) => {
  fs.readFile(path.join(cwd(), "/readme.md"), {
    encoding: "utf-8",
  }, (err, data) => {
    if (err) {
      res.send(err)
      return 
    }
    console.log(data)
    res.send(marked.parse(data))
  })
})
app.get("/readme/:component", (req, res) => {
  console.log(req.params)
  res.send(req.params)
},)

app.get("/", (req, res) => {
  res.redirect("/readme")
})

app.listen(port, () => {
  console.log("your app lives in " + "http://localhost:" + port);
});
