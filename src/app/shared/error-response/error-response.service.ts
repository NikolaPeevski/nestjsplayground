import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorResponseService {
  throw(status: HttpStatus, error?: string): void {
    throw new HttpException(
      {
        status,
        error
      },
      status
    );
  }
}
