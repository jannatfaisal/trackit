import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import taskRouter from './routes/taskRoutes.js'

const app = express()

app.use(cors({
    origin: 'https://taskify-two-navy.vercel.app',
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)

export default app