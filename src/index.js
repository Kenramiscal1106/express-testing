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
    res.send(marked.parse(data))
  })
})
app.get("/readme/:component", (req, res) => {
  // req.params.component
  const imageDir = path.join(cwd(), "src", "img");
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      res.send("non-existent directory")
      return
    }
    const reqFileDir = files
      .filter(file => /\.png/.test(file))
      .map(file => file.replace(/(\.png| )/g, ""))
    const reqFile = reqFileDir.find(img => req.params.component === img.toLowerCase());
    if (!reqFile) {
      res.status(404).send("image doesn't exist")
      return
    }
    const file = fs.createReadStream(imageDir + "/" + reqFile + ".png")
    file.on("data", (chunk) => {
      res.setHeader("Content-type", "image/png")
      res.send(chunk)
    })
  })
},)
app.get("/test/:component", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>${req.params.component}</h1>
      <img src="http://localhost:5000/readme/${req.params.component}" alt="an image that shoud appear"/>
    </body>
    </html>
  `)
})
app.get("/", (req, res) => {
  res.redirect("/readme")
})

app.listen(port, () => {
  console.log("your app lives in " + "http://localhost:" + port);
});
