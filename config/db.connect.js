export default (mongoose) => {

  mongoose.connection.on("connected", (ref) => {
    console.log(`Successfully connected to ${process.env.NODE_ENV}` +
      ` database on startup `);
  });

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error) => {

    if (error)
      throw error;
  });

}