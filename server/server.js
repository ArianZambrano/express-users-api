const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const databaseConnection = require("./database");
//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerSpec = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Ejemplo de Open Api con servidor express",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
  },
  apis: [
    `${path.join(__dirname,"../routes/*.js")}`,
    `${path.join(__dirname,"../schemas/*.js")}`,
  ]
}

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //database connection
    this.dbConnection();
    //middlewares
    this.middlewares();
    //application routes
    this.routes();
  }

  async dbConnection() {
    await databaseConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //JSON parse
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

    //file-upload
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
  }

  routes() {
    this.app.use("/api", require("../routes/index"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Listening port", this.port);
    });
  }
}

module.exports = Server;
