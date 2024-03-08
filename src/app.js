import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: 'process.env.CORS_ORIGIN',
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes Import
import userRoutes from './routes/user.routes.js'



// routes declaration

// we not use app.get or app.post here
// we use express.Router() in routes and then use app.use to use that router
// this is a good practice to keep the code clean and maintainable
// app.use('/api/v1/user', userRoutes) means that all the routes in userRoutes will be prefixed with /api/v1/user
app.use('/api/v1/user', userRoutes)

export default app;