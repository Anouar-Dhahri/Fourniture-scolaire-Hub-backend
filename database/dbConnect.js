import mongoose from 'mongoose';

const dbConnect = async (req, res, next) => {
    //const URI = "mongodb+srv://ameni:azerty123@cluster0.73n3gkp.mongodb.net/hubscolaire?retryWrites=true&w=majority"
    mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => {
        console.log("database connection failed. exiting now...");
        console.error(err);
        process.exit(1);
    })
}

export default dbConnect;