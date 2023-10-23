import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerOptions from '../../docs';
import customerRouter from './customerRouters';
import walletRouter from './walletRouters';
import accountRouter from './accountRouters';
import transactionRouter from './transactionRouters';

const url = `/api/${process.env.API_VERSION}`;
const router = Router();

router.use(
  `/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions),
);

router.use(`${url}/customers`, customerRouter);
router.use(`${url}/wallets`, walletRouter);
router.use(`${url}/accounts`, accountRouter);
router.use(`${url}/transactions`, transactionRouter);

router.all(`${url}/`, (req, res) => {
  res.send({
    status: 
  200,  pid: process.pid,
    message: 'Default API endpoint',
  });
});

router.use(`*`, (req, res) => {
  res
    .status(404)
    .json({ 
        status: 404, 
        message: 'This endpoint is not exist' 
    });
});

export default router;