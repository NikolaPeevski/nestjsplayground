import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpStatusFilter implements ExceptionFilter {
  name = 'HttpStatusFilter';
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorRes = exception.getResponse();

    this.infoLog(request.ip);
    this.infoLog(request.originalUrl);
    this.infoLog(request.method);

    response.status(status).json({
      statusCode: status,
      error: errorRes['error'] ?? errorRes
    });
  }

  private infoLog(info: unknown): void {
    console.log('---------');
    console.log(`${this.name}:`);
    console.log(info);
    console.log('---------');
  }
}
