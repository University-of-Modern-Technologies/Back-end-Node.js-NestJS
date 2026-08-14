import { Injectable, MessageEvent } from '@nestjs/common';
import { setTimeout as delay } from 'node:timers/promises';

const STEPS = [
  'Analyzing request',
  'Searching for a match',
  'Composing the answer',
];

@Injectable()
export class ChatService {
  private async generateAnswer(signal: AbortSignal): Promise<string> {
    console.log('Довга операція почалася');
    await delay(5000, undefined, { signal });
    console.log('Довга операція завершилася');

    return 'The answer is 42';
  }

  async *stream(signal: AbortSignal): AsyncGenerator<MessageEvent> {
    console.log('Клієнт підключився');

    try {
      for (const step of STEPS) {
        await delay(1000);
        yield { type: 'reasoning', data: step };
      }

      yield { type: 'answer', data: await this.generateAnswer(signal) };

      yield { type: 'done', data: 'Stream finished' };
    } catch (error) {
      if (signal.aborted) {
        return;
      }

      console.error(error);
      yield { type: 'error', data: 'Не вдалося завершити обробку' };
    } finally {
      console.log('Потік закрито');
    }
  }
}
