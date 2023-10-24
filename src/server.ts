import cluster from 'cluster';
import os from 'os';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import router from './app/restful/routers';
import db from './app/database/models'

dotenv.config();
const app = express();
const numCPU = os.cpus().length;
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false, limit: '30mb'  }));
app.use(express.json());
app.use(cors());
if(process.env.NODE_ENV != 'production') app.use(morgan("dev"));
app.use(router)

export async function startServer() {
  try {
    await db.sequelize.sync();
    return app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}`);
    });
  } catch (error:any) {
    console.error('Error starting the server:', error.message);
    throw error;
  }
}

export async function stopServer(server:any) {
  try {
    await db.sequelize.close();
    await new Promise<void>((resolve) => {
      server.close(() => {
        console.log('Server has been stopped');
        resolve();
      });
    });
  } catch (error:any) {
    throw error;
  }
}

if (cluster.isPrimary && process.env.NODE_ENV == "production" ) {
  const workers:any = [];
  for (let i = 0; i < numCPU; i += 1) {
    const worker = cluster.fork();
    workers.push(worker);
    worker.on('exit', (code, signal) => {
      const index = workers.indexOf(worker);
      if (index !== -1) {
        workers.splice(index, 1);
      }
      if (workers.length === 0) {
        process.exit(0);
      }
    });
  }
} else {
  startServer();
}

export default app;