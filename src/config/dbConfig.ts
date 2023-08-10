import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.mongo_uri!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      'connect success'
    });

    connection.on('error', (err) => {
      console.log('error', err);
    })
  } catch (error: any) {
    console.log(error)
  }
}