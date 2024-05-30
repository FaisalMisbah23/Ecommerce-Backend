import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from 'express'

const app = express()


app.use(cookieParser());;
// app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(json())

// routes imports
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import categoryRouter from './routes/category.routes.js'
import reviewRouter from './routes/review.routes.js'
import cartRouter from './routes/carts.routes.js'
import orderRouter from './routes/orders.routes.js'
// routes declarations
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/carts',cartRouter)
app.use('/api/v1/orders',orderRouter)

export { app };