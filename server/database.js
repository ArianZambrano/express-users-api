const mongoose = require("mongoose");
/**
 * Database connection
 * @returns {Promise<void>}
 */
const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Database conection failed");
  }
};

module.exports = databaseConnection;
