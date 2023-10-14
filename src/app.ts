import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
// import userRoutes from './app/routes/index'
import { PrismaClient } from '@prisma/client'
const app: Application = express()
const prisma = new PrismaClient()


//middlwares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/api/v1', async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: req.body
  })
  res.send(result)
})

app.get('/', (req: Request, res: Response) => {
  res.send({ "message": 'This route work successfully' })
})

//global error handler


//page not found router
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app