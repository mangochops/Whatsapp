import { Module } from '@nestjs/common';
import { WebhookReceiverController } from './webhook-receiver.controller';
import { WebhookReceiverService } from './webhook-receiver.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [WebhookReceiverController],
  providers: [WebhookReceiverService],
  exports: [WebhookReceiverService],
})
export class WebhookReceiverModule {}
