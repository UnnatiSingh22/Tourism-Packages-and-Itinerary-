import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/tur',
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('Socket.IO Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Gateway helpers to broadcast events to client rooms or globally
  emitDepartureUpdated(departureId: string, data: any) {
    this.server.emit('departure.updated', { departureId, ...data });
  }

  emitInventoryChanged(departureId: string, data: any) {
    this.server.emit('inventory.changed', { departureId, ...data });
  }

  emitTravelerBooked(travelerId: string, data: any) {
    this.server.emit('traveler.booked', { travelerId, ...data });
  }

  emitTravelerCancelled(travelerId: string, data: any) {
    this.server.emit('traveler.cancelled', { travelerId, ...data });
  }

  emitVoucherGenerated(voucherId: string, data: any) {
    this.server.emit('voucher.generated', { voucherId, ...data });
  }

  emitAllocationConfirmed(allocationId: string, data: any) {
    this.server.emit('allocation.confirmed', { allocationId, ...data });
  }
}
