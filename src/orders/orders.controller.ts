// src/orders/orders.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Órdenes')
@ApiBearerAuth() 
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const userId = req.user.id;
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes.' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtro por estado de la orden.' }) 
  async findAllByUserId(@Request() req, @Query() filters: any) {
    const userId = req.user.id;
    return this.ordersService.findAllByUserId(userId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por su ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la orden.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.ordersService.findOne(id, userId);
  }
}