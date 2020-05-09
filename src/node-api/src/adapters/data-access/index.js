import mongoose from 'mongoose';
import makeDbOperations from './db-operations';

const mongoURI = "mongodb://localhost:27017/todotoday";
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export async function makeDb() {
  mongoose.connect(mongoURI, options);
  return mongoose.connection;
};

mongoose.connection.on('error', (err)=>{
    console.log('handle mongo errored connections: ' + err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close();
    process.exit(0);
});

const db = makeDbOperations({ makeDb });

export default db;
