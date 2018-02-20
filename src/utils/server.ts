import { Server } from "http";

export const normalizePort = (val: number | string): number | string => {
    const port: number = (typeof val === 'string') ? (parseInt(val, 0)) : val

    if (isNaN(port)) { return val } else
    if (port > 0) { return port } else { return 0 }
}

export const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        const port: number | string = server.address().port;
        if (error.syscall !== 'listen') { throw error }
        const bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export const onListening = (server: Server) => {
    return (): void => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening at ${bind}...`);
    }
}
