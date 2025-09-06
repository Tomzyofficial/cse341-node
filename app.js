const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const contactRoute = require("./routes/contactsRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/contacts", contactRoute)
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(`Error occurred while initializing DB: ${err}`);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
