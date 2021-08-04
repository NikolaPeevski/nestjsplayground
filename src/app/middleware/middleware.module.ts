import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  providers: [LoggerMiddleware]
})
export class MiddlewareModule {}
