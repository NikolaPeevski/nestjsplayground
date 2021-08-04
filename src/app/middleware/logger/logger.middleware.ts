import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  name = 'LoggerMiddleware';
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  use(req: Request, res: Response, next: NextFunction) {
    this.infoLog(new Date());
    this.infoLog(req.ip);
    this.infoLog(req.originalUrl);
    this.infoLog(req.method);
    console.log(req.body);
    next();
  }

  private infoLog(info: unknown): void {
    console.log('---------');
    console.log(`${this.name}:`);
    console.log(info);
    console.log('---------');
  }
}
