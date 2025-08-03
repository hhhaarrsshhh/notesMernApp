import mongoose from 'mongoose';
 const connectDB = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_DB_URL) // Ensure you have the correct environment variable set
        console.log("MongoDB connected successfully");
    }

    catch(err){
        console.log("error in connecting databse")
    }

}
export { connectDB };
