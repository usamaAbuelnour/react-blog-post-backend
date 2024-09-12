const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const {
            connection: { host },
        } = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${host}`);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;
