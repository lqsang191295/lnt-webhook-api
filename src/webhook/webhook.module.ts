import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'), // Chỉ phục vụ file trong module webhook
      serveRoot: '/webhook', // Truy cập qua /webhook/xyz.html
    }),
    DatabaseModule,
  ],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
