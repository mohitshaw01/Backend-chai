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
// import videoRoutes from './routes/video.routes.js'
// import tweetRoutes from './routes/tweet.routes.js'
// import commentRoutes from './routes/comment.routes.js'
// import likeRoutes from './routes/like.routes.js'
// import subscriptionRoutes from './routes/subscription.routes.js'
// import healthRoutes from './routes/healthcheck.routes.js'
// import dashboardRoutes from './routes/dashboard.routes.js'
// import playlistRoutes from './routes/playlist.routes.js'


// routes declaration

// we not use app.get or app.post here
// we use express.Router() in routes and then use app.use to use that router
// this is a good practice to keep the code clean and maintainable
// app.use('/api/v1/user', userRoutes) means that all the routes in userRoutes will be prefixed with /api/v1/user

app.get('/', (req, res) => {
    res.send('Hello from user')
})

app.use('/api/v1/users', userRoutes);
// app.use('api/v1/video', videoRoutes);
// app.use('api/v1/tweet', tweetRoutes);
// app.use('api/v1/comment', commentRoutes);
// app.use('api/v1/like', likeRoutes);
// app.use('api/v1/subscription', subscriptionRoutes);
// app.use('api/v1/health', healthRoutes);
// app.use('api/v1/dashboard', dashboardRoutes);
// app.use('api/v1/playlist', playlistRoutes);




export default app;