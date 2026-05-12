import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/user-info')
  getUserInfo(): { name: string; age: number } {
    return this.appService.getUserInfo();
  }

  @Get('/supabase-users')
  getSupabaseUsers() {
    return this.appService.getSupabaseUsers();
  }

  @Post('/supabase-users')
  createTestUser() {
    return this.appService.createTestUser();
  }

  @Get('/products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Post('/products')
  createProduct(@Body() body: { name: string; price: number }) {
    return this.appService.createProduct(body.name, body.price);
  }

  @Delete('/products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id.trim());
  }

  @Put('/products/:id')
  updateProduct(@Param('id') id: string, @Body() body: { name?: string; price?: number }) {
    return this.appService.updateProduct(id.trim(), body.name, body.price);
  }
}
