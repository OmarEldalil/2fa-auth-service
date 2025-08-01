import express from "express";
import cors from  'cors'
import morgan from 'morgan';
import 'dotenv/config'
import {authRouter} from "./routes/auth";
import {usersRouter} from "./routes/user";
import {handleError} from "./services/error-handler-service";
import {generalRateLimiter} from "./middlewares/rate-limiter";



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

app.use(generalRateLimiter);

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use(handleError)

export default app;