import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'

dotenv.config(); //env file is in root no need to give path else give {path :""}

//connect to DB
connectDB();

//rest object
const app = express();

app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes); //api/v1/auth is just to follow naming conventions


//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to myEcom ecommerce app</h1>");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`.bgCyan.white);
})