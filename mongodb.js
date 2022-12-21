
const uri =
"mongodb+srv://<saidaliyevjasur450@gmail.com>:<yoljasron1221>@cluster0.luf7pct.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
try {
  await mongoose.connect(uri);
  console.log("Connected MongoDB ");
} catch (error) {
  console.log(error);
}
}   
connect();