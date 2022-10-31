const express = require("express");
const databaseConnection = require("./database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //database connection
    this.dbConnection();
  }

  async dbConnection() {
    await databaseConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Listening port", this.port);
    });
  }
}

module.exports = Server;
