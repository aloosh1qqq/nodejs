const express = require('express');
const req = require('express/lib/request');
const app = express();
const monogoose = require('mongoose');
const { MONGO_DB_CONFIG, MONGO_DB_CONGIG } = require("./config/app.config");
const errors = require("./middleware/error");
const helmet = require('helmet');
const compreesion = require('compression');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const session = require('express-session');


const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// monogoose.Promise = global.Promise;
// monogoose.connect(MONGO_DB_CONGIG.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     () => {
//         console.log("Database Connected");
//     },
//     (error) => {
//         console.log("Database cann't be connected: " + error);
//     }
// )


app.use(helmet());
app.use(compreesion());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", require("./routes/app.rout"));
app.use(errors.errorHandler);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    });

// app.listen(process.env.port || 4000, function() {
//     console.log("Ready to Go!");
// });