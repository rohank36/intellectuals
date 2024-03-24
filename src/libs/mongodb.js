import mongoose from "mongoose";

//TOOD: add a prod database and connect to it if process.env.NODE_ENV === 'production'
const connectMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        //console.log("Connected to MongoDB");
    } catch(error){
        console.error('MongoDB connection error:', error);
    }
}

export default connectMongoDB;

// lib/mongodb.js
/*
import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cached = global.mongoCache || {};
global.mongoCache = cached;

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            console.log('Connected to MongoDB');
            return {
                client,
                db: client.db(MONGODB_DB),
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
*/