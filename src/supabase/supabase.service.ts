import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;
  private adminClient: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.getOrThrow('SUPABASE_URL');

    this.client = createClient(url, this.config.getOrThrow('SUPABASE_KEY'));

    this.adminClient = createClient(
      url,
      this.config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
  }

  get supabase(): SupabaseClient {
    return this.client;
  }

  get admin(): SupabaseClient {
    return this.adminClient;
  }
}
