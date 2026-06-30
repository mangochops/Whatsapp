import { Controller, Post, Body, Logger, HttpCode } from '@nestjs/common';
import { WebhookReceiverService } from './webhook-receiver.service';

interface WebhookPayload {
  event?: string;
  payload?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

@Controller('webhook')
export class WebhookReceiverController {
  private readonly logger = new Logger(WebhookReceiverController.name);

  constructor(private readonly service: WebhookReceiverService) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() payload: WebhookPayload) {
    this.logger.log(`Webhook received: ${payload.event || 'unknown'}`);

    try {
      await this.service.process(payload);
    } catch (error) {
      this.logger.error('Error processing webhook', error);
    }
    return { success: true };
  }
}
