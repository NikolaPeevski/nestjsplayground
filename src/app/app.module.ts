import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import UserModule from './user/user.module';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
