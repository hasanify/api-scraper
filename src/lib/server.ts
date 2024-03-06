import {default as scrape} from '@/routes/scrape';
import cors from 'cors';
import express, {Application, NextFunction, Request, Response, json} from 'express';

const create = () => {
  const app: Application = express();

  app.use(json({limit: '5mb'}));
  app.use(cors());
  app.use('/scrape', scrape);

  app.use(async (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
  });

  return app;
};

export default create;
