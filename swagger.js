const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Sample API",
    description: "This is a sample API",
  },
  host: "https://cse341-node-ma9j.onrender.com/contacts",
};

const outputFile = "./swagger.json";
const routes = ["./routes/contactsRoute.js"];

swaggerAutogen(outputFile, routes, doc);
