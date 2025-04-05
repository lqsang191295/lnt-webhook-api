import { Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('module/AD_UserAccount')
export class AD_UserAccountController {
  private readonly logger = new Logger(AD_UserAccountController.name);

  constructor() {}
}
