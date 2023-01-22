const mongoose = require("mongoose");

const server = process.env.MONGO_HOST + ":" + process.env.MONGO_PORT || '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = process.env.MONGO_DB || 'fastifydb'; // REPLACE WITH YOUR DB NAME

const dbHost = `mongodb://${server}/${database}`;

mongoose.set('strictQuery', false);

mongoose.connect(dbHost, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("################# DATABASE ERROR ##############")
    console.log(" database is not ready ...");
});
db.once("open", () => {
    console.log("################# DATABASE RUN ##############")
    console.log("> MongoDB Database Is Open And Ready !!!");
});

module.exports = mongoose;