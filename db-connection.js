const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/lab4', {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true 
})
.then(console.log("connectionn successfuly"))
.catch((err)=>{
  console.log(err);
  console.log("connection faild");
})

module.exports = mongoose;