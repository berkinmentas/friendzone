const mongoose = require("mongoose");
const uri =
  "mongodb+srv://berkinmentas:berkin123@cluster0.95iahlm.mongodb.net/friendzone?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Veritabanına bağlandı"))
    .catch((err) =>
      console.error("Veritabanına bağlanırken hata oluştu:", err)
    );
};

module.exports = connectDB;
