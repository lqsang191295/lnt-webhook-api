import { Controller, Sse } from '@nestjs/common';
import { Observable, interval, map, merge } from 'rxjs';
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
    const ping$ = interval(25000).pipe(
      map(() => ({ data: ':ping' })), // mỗi 25s gửi comment ":ping"
    );

    const data$ = dbChangeSubject.pipe(map((data) => ({ data })));

    return merge(ping$, data$); // kết hợp cả 2 luồng
  }
}
