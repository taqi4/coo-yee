const mongoose = require('mongoose');
mongoose.connect( "mongodb+srv://taqi45:CooYee110@cluster0.nmvl2.mongodb.net/CooYee?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false

}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log(e);
});