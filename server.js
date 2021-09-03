const express=require("express")
const app=express()
const mongoose=require("mongoose");
const cors=require("cors")

const userRouter=require("./routes/userRouter")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/users',userRouter)
let url="mongodb+srv://Pawan:pawan123@cluster0.asc1h.mongodb.net/UserAuth?retryWrites=true&w=majority"
mongoose.connect((url), {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then((connection)=>{
    console.log(("Succesfully connected to database"));
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server started in 5000");
    })
}).catch((err)=>{
    console.log("Error in connecting",err);
})