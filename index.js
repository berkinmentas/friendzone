const express = require("express");
const app = express();
const routes = require("./routes/route");
const port = 3000;
const connectDB = require("./connection.js"); // db.js dosyasını import edin
const bodyParser = require("body-parser");
connectDB();

app.use(bodyParser.json());
app.use("/api", routes);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
