import { Injectable, Logger } from '@nestjs/common';
import { SessionService } from '../session/session.service';

interface WebhookPayload {
  event?: string;
  payload?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

interface IncomingMessage {
  from?: string;
  body?: string;
}

@Injectable()
export class WebhookReceiverService {
  private readonly logger = new Logger(WebhookReceiverService.name);

  constructor(private readonly sessionService: SessionService) {}

  async process(payload: WebhookPayload) {
    if (payload.event === 'message.received') {
      const msgData: Record<string, unknown> = (payload.payload || payload.data || payload) as Record<string, unknown>;
      const msg: IncomingMessage = {
        from: typeof msgData?.from === 'string' ? msgData.from : undefined,
        body: typeof msgData?.body === 'string' ? msgData.body : undefined,
      };
      const chatId = msg.from;
      const text = msg.body?.trim();

      if (chatId && text) {
        try {
          const handled = await this.sessionService.handleIncomingMessage(chatId, text);
          if (handled) {
            this.logger.log(`Onboarding progressed for ${chatId}`);
          }
        } catch (error) {
          this.logger.error(`Failed to handle message for ${chatId}`, error);
        }
      }
    }
  }
}
