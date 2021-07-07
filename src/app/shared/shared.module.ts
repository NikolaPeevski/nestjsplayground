import { Global, Module } from '@nestjs/common';
import { ErrorResponseService } from './error-response/error-response.service';

@Global()
@Module({
  providers: [ErrorResponseService],
  exports: [ErrorResponseService]
})
export class SharedModule {}
