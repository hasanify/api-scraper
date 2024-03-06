import ScrapeService from '@/services/scrape';
import {NextFunction, Request, Response} from 'express';

class ScrapeControllers {
  public static get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {url}: {url: string} = req.query as any;
      return res.json(await ScrapeService.scrape({url}));
    } catch (error) {
      next(error);
    }
  };
}

export default ScrapeControllers;
