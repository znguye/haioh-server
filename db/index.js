const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Using database: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
