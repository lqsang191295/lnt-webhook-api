import { Controller, Sse, Res } from '@nestjs/common';
import { Response } from 'express';
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
  sendNotifications(@Res() res: Response): Observable<ServerSentEvent> {
    res.setHeader('Access-Control-Allow-Origin', 'http://172.16.0.10:3004'); // 👈 Thêm dòng này
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    return dbChangeSubject.pipe(map((data) => ({ data })));
  }
}
