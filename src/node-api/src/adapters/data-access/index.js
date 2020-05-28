import makeDbOperations from './db-operations';
import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/todotoday?poolSize=4";
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoURI, options);
console.log("Database connection succeeded");

mongoose.connection.on('error', (err)=>{
  console.log('handle mongo errored connections: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit(0);
});

const db = makeDbOperations();

export default db;
