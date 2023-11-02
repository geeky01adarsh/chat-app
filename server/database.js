import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

export const connect_db = async() => {
    try {
        await mongoose.connect(CONNECTION_URL);
        console.log("Successfully connected to the database")
    } catch (error) {
        console.log('Connection to database failed.')
        console.error(error.message);
    }
}