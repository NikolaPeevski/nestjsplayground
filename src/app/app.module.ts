import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { MiddlewareModule } from './middleware/middleware.module';
import UserModule from './user/user.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ExceptionFilterModule } from './exception-filter/exception-filter.module';
import { HttpStatusFilter } from './exception-filter/http-status/http-status.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [UserModule, SharedModule, MiddlewareModule, ExceptionFilterModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpStatusFilter
    }
  ]
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
