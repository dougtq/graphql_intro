import http = require('http')
import { normalizePort, onError, onListening } from './utils/server'

import App from './app'

const server = http.createServer(App)
const port = normalizePort(process.env.PORT || 3000)

server.listen(port)
server.on('error', onError(server))
server.on('listening', (onListening(server)))
