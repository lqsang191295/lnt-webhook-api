import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleWebHook(
    @Query('code') code: string,
    @Query('oa_id') oaId: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      console.log('Code:', code);
      console.log('OA_ID:', oaId);
      console.log(
        'Key secret ',
        process.env.ZALO_SECRET_KEY,
        process.env.ZALO_APP_ID,
      );
      console.log('body ', body);

      if (code && oaId) {
        const data = this.webhookService.getAccessToken(code);
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

      res.status(HttpStatus.OK).send({});
    } catch (ex) {
      console.log('Error ', ex);
    }
  }

  @Get('refresh')
  async refreshToken(@Query('refresh_token') refreshToken: string) {
    return this.webhookService.refreshAccessToken(refreshToken);
  }

  @Get()
  findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('OK');
  }
}
