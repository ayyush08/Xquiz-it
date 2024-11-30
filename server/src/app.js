import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { errorHandler } from './utils/errorHandler.js';
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

import userRouter from './routes/user.route.js'
import questionRouter from './routes/questions.route.js'
app.use('/quizapi/user', userRouter)


app.use('/quizapi/questions', questionRouter)
app.use(errorHandler)





export { app };