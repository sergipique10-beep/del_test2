import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private supabase: SupabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUserInfo(): any {
    const userInfo = {
      name: 'John Doe',
      age: 30,
    };
    return userInfo;
  }

  async getSupabaseUsers() {
    const { data, error } = await this.supabase.admin.auth.admin.listUsers();
    if (error) throw error;
    return data.users;
  }

  async createTestUser() {
    const { data, error } = await this.supabase.admin.auth.admin.createUser({
      email: 'test@example.com',
      password: 'Test1234!',
      email_confirm: true,
    });
    if (error) throw error;
    return data.user;
  }

  async getProducts() {
    const { data, error } = await this.supabase.admin
      .from('products')
      .select('*');
    if (error) throw error;
    return data;
  }

  async createProduct(name: string, price: number) {
    const { data, error } = await this.supabase.admin
      .from('products')
      .insert({ name, price })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteProduct(id: string) {
    const { error } = await this.supabase.admin
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }

  async updateProduct(id: string, name?: string, price?: number) {
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    const { data, error } = await this.supabase.admin
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

}
