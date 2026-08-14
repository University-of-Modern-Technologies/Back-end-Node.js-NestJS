import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { Observable, finalize, from } from 'rxjs';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    const controller = new AbortController();

    return from(this.chatService.stream(controller.signal)).pipe(
      finalize(() => controller.abort()),
    );
  }
}
