const mongoose = require('mongoose');

let uri = 'mongodb://localhost/country_data';

if (process.env.NODE_ENV === "PRODUCTION"){
    uri = "";
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true }).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(`Mongoose connection error: ${err}`);
});

const shutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    shutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', () => {
    shutdown('app termination', () => {
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    shutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});