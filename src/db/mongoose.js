const mongoose = require('mongoose');

const connectionURL = `${process.env.MONGODB_URL}${process.env.DB_NAME}`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
