import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WebhookService } from './webhook.service';
import { DatabaseService } from '../database/database.service';
import { error } from 'console';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post()
  async handleWebHook(
    @Body() body: Record<string, unknown>,
    @Res() res: Response,
  ) {
    try {
      const { code, oaId } = body;

      console.log('Code:', code);
      console.log('OA_ID:', oaId);
      console.log(
        'Key secret ',
        process.env.ZALO_SECRET_KEY,
        process.env.ZALO_APP_ID,
      );
      console.log('body ', body);

      if (code && oaId) {
        const data = await this.webhookService.getAccessToken(code as string);

        this.databaseService.saveToken(data.accessToken, data.refreshToken);

        res.status(HttpStatus.OK).send({ ...data });
      } else if (body) {
        //
        // const bodyData = {
        //   app_id: '1245263641202768423',
        //   user_id_by_app: '4036408378183179479',
        //   event_name: 'user_send_text',
        //   timestamp: '1741702286087',
        //   sender: { id: '7084782037479163447' },
        //   recipient: { id: '579745863508352884' },
        //   message: {
        //     msg_id: 'This is message id',
        //     text: 'This is testing message',
        //   },
        // };
      }
    } catch (error) {
      console.log('Error ', error);
      res.status(HttpStatus.FAILED_DEPENDENCY).send({
        error,
      });
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.webhookService.refreshAccessToken(refreshToken);
  }
}
