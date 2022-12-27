const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const databaseConnection = require("./database");

/**
 * Server class for setting up the express server and database connection
 * @class Server
 */
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


  /**
   * Database connection
   */
  async dbConnection() {
    await databaseConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //JSON parse
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    //file-upload
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
  }

  /**
   * Setup application routes
   */
  routes() {
    this.app.use("/api", require("../routes/index"));
  }

  /**
   * Listen port
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log("Listening port", this.port);
    });
  }
}

module.exports = Server;
