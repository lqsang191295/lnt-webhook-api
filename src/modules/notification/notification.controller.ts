// src/notification/notification.controller.ts
import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { dbChangeSubject } from 'src/event-stream'; // cái subject bạn tạo
import { map } from 'rxjs';
import { Observable } from 'rxjs';

interface ServerSentEvent<T = any> {
  data: T;
  id?: string;
  event?: string;
  retry?: number;
}

@Controller('notification')
export class NotificationController {
  @Get('sse')
  sendNotifications(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Observable<ServerSentEvent> {
    const origin = req.headers.origin || '*';

    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    return dbChangeSubject.pipe(map((data) => ({ data })));
  }
}
