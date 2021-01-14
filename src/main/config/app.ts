import setupStaticFiles from './static-files'
import setupSwagger from './config-swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import express from 'express'

const app = express()

setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
