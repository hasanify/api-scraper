import {default as scrape} from '@/routes/scrape';
import cors from 'cors';
import express, {Application, NextFunction, Request, Response, json} from 'express';

const create = () => {
  const app: Application = express();

  app.use(json({limit: '5mb'}));
  app.use(cors());
  app.use('/scrape', scrape);

  app.use(async (error: any, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || error.statusCode || 503;
    const msg = error.message || error.msg || 'an error occurred';

    res.status(status).json({status, msg});
  });

  return app;
};

export default create;
