const mongoose = require('mongoose');

const connectionUrlDev = `${process.env.MONGODB_URL}${process.env.DB_NAME}`;
const connectionUrlProd = `${process.env.MONGODB_CLOUD_URL}`;

mongoose.connect(
  connectionUrlProd,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log('MONGOOSE', err);
    }
  }
);
