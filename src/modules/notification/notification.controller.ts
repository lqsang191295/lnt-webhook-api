import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { dbChangeSubject } from 'src/event-stream';

interface ServerSentEvent<T = any> {
  data: T;
  id?: string;
  event?: string;
  retry?: number;
}

@Controller('notification')
export class NotificationController {
  @Sse('sse')
  sendNotifications(): Observable<ServerSentEvent> {
    return dbChangeSubject.pipe(
      map((data) => ({ data }))
    );
  }
}
