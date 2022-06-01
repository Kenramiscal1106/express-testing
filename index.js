const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;

app.get("/readme/:framework", () => {

},)

app.listen(port, () => {
  console.log("your app lives in " + "http://localhost:" + port);
});
