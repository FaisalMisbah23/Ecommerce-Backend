import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'
const connectToDb = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Connected to Mongodb, Database Name : ${DB_NAME}, Host Name : ${connectionResponse.connection.host}`)
    } catch (error) {
        console.log("Error white connecting to MongoDB: " , error);
        process.exit(1)
    }
}

export default connectToDb