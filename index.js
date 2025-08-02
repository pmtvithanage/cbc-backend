import express from 'express';
import mongoose from 'mongoose'; 
import studentsRouter from './routes/studentsRouter.js';
import usersRouter from './routes/usersRouter.js';
import jwt from 'jsonwebtoken';
import productsRouter from './routes/productRouter.js';

const app = express();

app.use(express.json()); //middleware to parse JSON bodies


// Middleware to log HTTP requests
app.use(
    (req, res, next) => {

        let token = req.header("Authorization");

        if (token != null){
            // Remove "Bearer " from the token if it exists
            token = token.replace("Bearer ",""); 
            console.log(token);

            // Decrypt the token
            jwt.verify(token, "jwt_secret",(err, decoded) => {
                    if (decoded == null) {
                        res.json(
                            {
                                message: "Invalid token please login again"
                            }
                        )
                        return;
                    } else {
                        console.log(decoded);
                        req.user = decoded;
                    }
                }
            )
        }
        next(); 
    }
)
const connectionString = "mongodb+srv://admin:123@cluster0.8etyt1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString).then(() => {
        console.log('Connected to MongoDB successfully');
    }
).catch(() => {
    console.error('Error connecting to MongoDB:', error);
}
)

app.use("/students",studentsRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)


app.listen(3000, () => {
    console.log('Server is running on port 3000');

})