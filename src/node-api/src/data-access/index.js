import mongoose from 'mongoose';
import makeCategoriesCollection from './categories-collection';

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

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + mongoURI);
});

mongoose.connection.on('error', (err)=>{
    console.log('handle mongo errored connections: ' + err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(()=>{
        console.log('App terminated, closing mongo connections');
        process.exit(0);
    });
});

const categoriesDb = makeCategoriesCollection({ makeDb });

const db = Object.freeze({
  categoriesDb
});

export default db;
export { categoriesDb };
