const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb://localhost:27017";

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = client;
