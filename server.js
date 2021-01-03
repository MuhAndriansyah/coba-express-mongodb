const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const port = 3000;
const routers = require("./routers");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routers);
app.use(compression());

const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "404 Not Found",
  });
};

app.use(notFound);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
