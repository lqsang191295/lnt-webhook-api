import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebHook(
    @Query('code') code: string,
    @Query('oa_id') oaId: string,
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
    } catch (ex) {
      console.log('Error ', ex);
    }

    res.status(HttpStatus.OK).send('OK');
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK);
  }
}
