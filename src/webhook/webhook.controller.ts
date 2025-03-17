import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WebhookService } from './webhook.service';
import { HT_ThamsoService } from 'src/modules/HT_Thamso/HT_Thamso.service';
import { TypeResponseZaloError } from 'src/common/types/zalo';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly htThamSoService: HT_ThamsoService,
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

      if (code && oaId) {
        const data = await this.webhookService.getAccessToken(code as string);

        if ('error' in data) {
          return res.status(HttpStatus.FAILED_DEPENDENCY).send({ ...data });
        }

        this.htThamSoService.saveToken(data.access_token, data.refresh_token);

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
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.webhookService.refreshAccessToken(refreshToken);

      if ('error' in data) {
        return res.status(HttpStatus.FAILED_DEPENDENCY).send({ ...data });
      }

      this.htThamSoService.saveToken(data.access_token, data.refresh_token);

      return res.status(HttpStatus.OK).send({ ...data });
    } catch (error) {
      return res.status(HttpStatus.FAILED_DEPENDENCY).send({ error });
    }
  }
}
