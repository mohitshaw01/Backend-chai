import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'process.env.CORS_ORIGIN',
}));
// mention the reason in 10 words
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


export default app;