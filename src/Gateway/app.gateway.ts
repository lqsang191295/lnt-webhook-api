// src/app.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({
    port: 9009,
    path: '/',
})
export class AppGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('✅ WebSocket server initialized');
    }

    handleConnection(client: WebSocket) {
        console.log('🔌 Client connected');
        client.send('Hello from NestJS WebSocket Server!');
    }

    handleDisconnect(client: WebSocket) {
        console.log('❌ Client disconnected');
    }

    // Gửi/nhận message nếu bạn định nghĩa protocol thủ công
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string): string {
        console.log('📩 Received:', data);
        return `You sent: ${data}`;
    }

    // Gửi message đến tất cả client
    broadcastToAll(message: string) {
        this.server.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    }
}
