import { Controller, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
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
  sendNotifications(@Res({ passthrough: true }) res: Response): Observable<ServerSentEvent> {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // để nginx không buffer
    });

    const ping$ = interval(25000).pipe(
      map(() => ({ data: ':ping\n\n' })),
    );

    const data$ = dbChangeSubject.pipe(
      map((data) => ({ data: JSON.stringify(data) + '\n\n' })),
    );

    return merge(ping$, data$);
  }
}
