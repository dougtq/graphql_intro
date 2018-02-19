import { json, urlencoded } from 'body-parser'
import express = require('express')
import expressQl = require('express-graphql')
import helmet = require('helmet')

import schema from './graphql/schemas';

class App {

  public express: express.Application

  constructor() {
    this.express = express()
    this.middleware()
  }

  private middleware(): void {
    this.express.use([json(), urlencoded({ extended: true })])
    this.express.use(helmet())
    this.express.use('/health', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send({
        working: true,
      })
    })
    this.express.use('/graphql', expressQl({
      schema,
      graphiql: process.env.NODE_ENV === 'development'
    }))
  }
}

export default new App().express
