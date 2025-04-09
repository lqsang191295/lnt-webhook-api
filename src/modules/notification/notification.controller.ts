import { Controller, Sse } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Public } from 'src/common/decorators/public.decorator';
import { dbChangeSubject } from 'src/event-stream';

interface ServerSentEvent<T = any> {
  data: T;
  id?: string;
  event?: string;
  retry?: number;
}

@Controller('notification')
export class NotificationController {
  @Public()
  @Sse('sse')
  sendNotifications(): Observable<ServerSentEvent> {
    return dbChangeSubject.pipe(map((data) => ({ data })));
  }
}
