import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserOnboarding } from './entities/user-onboarding.entity';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session, UserOnboarding], 'data'), forwardRef(() => WebhookModule)],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
