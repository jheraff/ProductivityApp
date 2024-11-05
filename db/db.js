
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://danieljbautista5:jcbcB37jWgKt6h1A@cluster0.r7kkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
    console.log('MongoDB Connected: ${conn.connection.host}');
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
