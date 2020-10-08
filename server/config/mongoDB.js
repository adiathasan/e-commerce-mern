import mongoose from "mongoose";

const DB_URI_KEY = `mongodb+srv://adiat-hasan:Ar271997@cluster0.blejq.mongodb.net/k-shop?retryWrites=true&w=majority`;

// connection

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(DB_URI_KEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

export { dbConfig, DB_URI_KEY };
