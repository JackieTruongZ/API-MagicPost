import {
  Body,
  Controller, Delete, Get, Param,
  Post, Put,
  UseGuards
} from "@nestjs/common";
import { JwtGuard } from '../auth/guard';
import { OrderService } from './order.service';
import { OrderDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { OrderStatusDto } from "./dto/order.status.dto";

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post('add-order')
  async createOrder(
    @GetUser() user: User,
    @Body() dto: OrderDto,
  ) {
    const order =
      await this.orderService.createOrder(
        dto,
        user,
      );
    return order;
  }

@Post('confirm-order-from-trans')
async confirmOrderFromTrans(
  @GetUser('id') userId: number,
  @Body() dto: OrderStatusDto,
){
    const confirm = await this.orderService.confirmOrderFromTrans(dto.orderId,userId);
    return confirm;
}

  @Post('confirm-order-on-hub')
  async confirmOrderOnHub(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ){
    const confirm = await this.orderService.confirmOrderOnHub(dto.orderId,userId);
    return confirm;
  }

  @Post('confirm-order-from-hub')
  async confirmOrderFromHub(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ){
    const confirm = await this.orderService.confirmOrderFromHub(dto.orderId,userId);
    return confirm;
  }

  @Post('confirm-order-on-trans')
  async confirmOrderOnTrans(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ){
    const confirm = await this.orderService.confirmOrderOnTrans(dto.orderId,userId);
    return confirm;
  }

  @Post('confirm-order-success-fail')
  async confirmSuccessFail(
    @GetUser('id') userId: number,
    @Body() dto: OrderStatusDto,
  ){
    const confirm = await this.orderService.confirmSuccessFail(dto.orderId,userId,dto.status);
    return confirm;
  }

  @Get('order')
  async findAllOrder(
    @GetUser() user: User,
  ) {
    const product =
      await this.orderService.findAllOrder(
        user,
      );
    return product;
  }

  @Get('order/:id')
  async findOrderById(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.findOrderById(
        parseInt(productId),
        user
      );
    return product;
  }

  @Delete('delete-order/:id')
  async deleteOrder(
    @GetUser() user: User,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.deleteOrder(
        parseInt(productId),
        user,
      );
    return product;
  }
  @Put('update-order/:id')
  async updateOrder(
    @GetUser() user: User,
    @Body() dto: OrderDto,
    @Param('id') productId : string
  ) {
    const product =
      await this.orderService.updateOrder(
        dto,
        parseInt(productId),
        user,
      );
    return product;
  }
}