const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
//const PORT = process.env.PORT||5000

//database
//const MONGO_URL = 'mongodb+srv://poorni:poorni@poorni.7ajincx.mongodb.net/blog?retryWrites=true&w=majority';

// Database connection
async function connectDB() {
    try{

    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connection established")
    
    const port = process.env.PORT||8000
    
}
catch(e){
    console.log(e)
    console.log("could not establish connection")

}
}



// //middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({ origin:'http://localhost:5173', credentials: true}))

 app.use(cookieParser())
app.use("/api/auth",authRoute)
 app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT,()=>{

    connectDB()
    console.log("app is running on port " +process.env.PORT)
 })