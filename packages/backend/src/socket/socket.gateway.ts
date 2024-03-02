import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

@WebSocketGateway(
  4001, {
  cors: {
    origin: `*`
  }
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log("Initialized");
  }

  handleConnection(client: Socket) {
    console.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliend id:${client.id} disconnected`);
  }

  emitRoundAdded(round: any) {
    this.server.emit('roundAdded', round);
  }

  @SubscribeMessage('saveAll')
  handleMessage(client: any, payload: any) {
    // return 'Hello world!';
    console.log(`Cliend id:${client.id}`, { payload });

    this.server.emit('saveAllMobile', { name: 'Nest' });
    // return {
    //   event: "saveAllMobile",
    //   data: "make the test fail",
    // };
  }
}
