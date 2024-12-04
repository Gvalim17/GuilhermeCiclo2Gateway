import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { NovoVeiculo } from './interface/novo-veiculo';

@Controller()
export class AppController {
  private clienteAdminBackend: ClientProxy
  constructor(private readonly appService: AppService) {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport:Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: 'novo-veiculo'
      }
    })
  }

  @Get()
  async getHello() {
    return await this.clienteAdminBackend.emit("teste","teste");
  }

  @Post('adicionar-veiculo')
  async adicionarVeiculo(@Body() novoVeiculo:NovoVeiculo){
    return await this.clienteAdminBackend.emit('adicionar-veiculo',novoVeiculo)
  }
}
